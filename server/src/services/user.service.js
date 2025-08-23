import crypto from "crypto";
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import responseHandler from "../utils/responseHandler.js";
import mailService from "./email.service.js";
import jwt from "jsonwebtoken";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../utils/cloudinary.js";

const { errorResponse, notFoundResponse } = responseHandler;

const userService = {
  register: async (userData, next) => {
    //check if email already exist
    const emailExists = await User.findOne({ email: userData.email });
    if (emailExists) {
      return next(errorResponse("Email already exists", 400));
    }
    //If fresh new userData-email, then we proceed to creating our user.
    //handle verification to be sent to user email.
    const verificationCode = crypto.randomInt(100000, 999999).toString(); //six characters randomly generated
    const verificationCodeExpiry = new Date(Date.now() + 3600000); //1hr expiry
    //handle password encryption
    const salt = await bcrypt.genSalt(10); //degree of encryption
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    //proceed to creating our user
    const user = await User.create({
      ...userData,
      password: hashedPassword,
      verificationToken: verificationCode,
      verificationTokenExpiry: verificationCodeExpiry,
    });
    //proceed to sending email to user

    //We are going to use a process from node process.nextTick - this allows us to not block synchronous operations - The Api response won't wait for the email to be sent, even if email fails, it won't affect the creation of the user
    process.nextTick(() => {
      mailService.sendWelcomeMail(user).catch(console.error);
    });

    //if user could not be registered, then we send a server error..
    if (!user) {
      return next(errorResponse("User registeration failed"));
    }
    return user; //send user to our controller.
  },
  //login User
  login: async (userData, next) => {
    //Find user with email from the form.
    const user = await User.findOne({ email: userData.email }).select(
      "+password"
    ); //select includes the field we want to have access to, In this case the password.
    if (!user) {
      return next(errorResponse("Account not found", 401));
    }
    //handle password
    const isPasswordCorrect = await bcrypt.compare(
      userData.password,
      user.password
    ); //userData.password is from the form, while user.password is the password saved about the user in the database.
    if (!isPasswordCorrect) {
      return next(errorResponse("Incorrect email or pasword", 401));
    }
    return user;
  },
  authenticateUser: async (userId, next) => {
    //get userId from Our jwt decoded token
    const user = await User.findById(userId);
    if (!user) {
      return next(notFoundResponse("User not found"));
    }
    return user;
  },
  // logoutUser: async (req, res, next) => {
  //   //reset the cookie maxAge value to 0
  //   res.cookie("userRefreshToken", "", {
  //     maxAge: 0,
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  //     path: "/",
  //   });
  //   return true;
  // },
  //get a new accessToken when current one expires
  refreshAccessToken: async (refreshToken, next) => {
    if (!refreshToken) {
      return next(errorResponse("Refresh token is required", 401));
    }
    //verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return next(errorResponse("Invalid refresh token", 401));
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(errorResponse("User account not found"));
    }
    return user;
  },
  verifyUserAccount: async (data, next) => {
    //destructure data
    const { userId, verificationToken } = data;
    //find our user, and get the verificationToken & Expiry saved to the user.
    const user = await User.findById(userId).select(
      "verificationToken +verificationTokenExpiry"
    );
    if (!user) {
      return next(notFoundResponse("Account not found"));
    }
    //check if user is already verified
    if (user.isVerified) {
      return next(errorResponse("Account is already verified", 400));
    }
    //check if verificationToken saved is DB is same as the one received from the form
    if (user.verificationToken !== verificationToken) {
      return next(errorResponse("Invalid verification token", 400));
    }
    //check if verificationToken has expired
    if (user.verificationTokenExpiry < new Date()) {
      user.verificationToken = undefined;
      user.verificationTokenExpiry = undefined;
      await user.save();
      return next(
        errorResponse(
          "Verification token has expired, please get a new one!",
          400
        )
      );
    }
    //verify user if token has not expired
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();
    return user; //return user to our controller
  },
  resendVerificationToken: async (userId, next) => {
    const user = await User.findById(userId).select(
      "+verificationToken +verificationTokenExpiry"
    );
    if (!user) {
      return next(notFoundResponse("Account not found"));
    }
    if (user.isVerified) {
      return next(errorResponse("Account already verified", 400));
    }
    const verificationCode = crypto.randomInt(100000, 999999).toString();
    const verifieationCodeExpiry = new Date(Date.now() + 3600000); // 1hour expiry
    user.verificationToken = verificationCode;
    user.verificationTokenExpiry = verifieationCodeExpiry;
    await user.save();
    process.nextTick(() => {
      mailService.sendVerificationCode(user).catch(async (error) => {
        user.verificationToken = undefined;
        user.verificationTokenExpiry = undefined;
        await user.save();
        console.error("Failed to send verification token", error);
      });
    });
    return user; //return user to our controller
  },

  forgotPassword: async (userData, next) => {
    const user = await User.findOne({ email: userData.email });
    if (!user) {
      return next(notFoundResponse("Account not found"));
    }
    //generate resenc code
    const resetCode = crypto.randomInt(100000, 999999).toString();
    const resetCodeExpiry = new Date(Date.now() + 900000); //15 minutes
    user.passwordResetToken = resetCode;
    user.passwordResetTokenExpiry = resetCodeExpiry;
    await user.save();
    process.nextTick(() => {
      mailService.sendPasswordResetEmail(user).catch(async (error) => {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiry = undefined;
        await user.save();
        console.error("Failed to send password token", error);
      });
    });
    return user;
  },
  resetPassword: async (userData, next) => {
    const { email, password, confirmPassword, passwordResetToken } = userData;
    if (password !== confirmPassword) {
      return next(errorResponse("Passwords do not match", 400));
    }
    const user = await User.findOne({ email }).select(
      "+password +passwordResetToken +passwordResetTokenExpiry"
    );
    if (!user) {
      return next(notFoundResponse("Account not found with that email"));
    }
    if (
      !user.passwordResetToken ||
      user.passwordResetToken !== passwordResetToken
    ) {
      return next(errorResponse("Password reset token not found", 400));
    }
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (isPasswordSame) {
      return next(
        errorResponse("New password must be different from old password", 400)
      );
    }
    if (user.passwordResetTokenExpiry < new Date()) {
      user.passwordResetToken = undefined;
      user.passwordResetTokenExpiry = undefined;
      await user.save();
      return next(errorResponse("Password reset token has expired", 400));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await user.save();
    return user;
  },
  logout: async (req, res, next) => {
    res.cookie("userRefreshToken", "", {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });
    return true;
  },
  uploadAvatar: async (userId, avatar, next) => {
    const user = await User.findById(userId);
    if (!user) {
      return next(notFoundResponse("No user found with that email"));
    }
    if (!avatar) {
      return next(errorResponse("No file uploaded", 400));
    }
    //check if user has avatar already
    const currentAvatar = user.avatar;
    const currentAvatarId = user.avatarId;
    if (currentAvatar) {
      //if avatar exists, delete and replace with new avatar
      await deleteFromCloudinary(currentAvatarId);
    }
    const { url, public_id } = await uploadToCloudinary(avatar, {
      folder: "Clinicare/avatars",
      width: 200,
      height: 200,
      crop: "fit",
      format: "webp",
    });
    user.avatar = url || user.avatar;
    user.avatarId = public_id || user.avatarId;
    await user.save();
    return user;
  },

  updateUserPassword: async (userId, userData, next) => {
    const user = await User.findById(userId).select("+password");
    if (!user) {
      return next(notFoundResponse("No user found with that email"));
    }
    const { password, newPassword, confirmPassword } = userData;
    const [checkPassword, isPasswordSame] = await Promise.all([
      bcrypt.compare(password, user.password),
      bcrypt.compare(newPassword, user.password),
    ]);
    if (!checkPassword) {
      return next(errorResponse("Incorrect current password", 400));
    }
    if (newPassword !== confirmPassword) {
      return next(
        errorResponse("New password and confirm password does not match", 400)
      );
    }
    if (isPasswordSame) {
      return next(
        errorResponse("New password must be different from old password", 400)
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    const updatedUser = await user.save();
    return updatedUser;
  },

  updateUser: async (userId, userData, next) => {
    const user = await User.findById(userId);
    if (!user) {
      return next(notFoundResponse("No user found with that email"));
    }
    for (const [key, value] of Object.entries(userData)) {
      if (value) {
        user[key] = value;
      }
    }
    const updatedUser = await user.save();
    return updatedUser;
  },

  deleteAccount: async (userId, next) => {
    const user = await User.findById(userId);
    if (!user) {
      return next(notFoundResponse("Account not found"));
    }
    if (user.avatarId) {
      await deleteFromCloudinary(user.avatarId);
    }
    await user.deleteOne();
    return true;
  },
};

export default userService;
