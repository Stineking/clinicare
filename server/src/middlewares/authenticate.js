import jwt from "jsonwebtoken";
import { promisify } from "util";
import tryCatchFn from "../utils/tryCatchFn.js";
import responseHandler from "../utils/responseHandler.js";
import User from "../models/user.js";
const { forbiddenResponse, unauthorizedResponse } = responseHandler;

export const verifyAuth = tryCatchFn(async (req, res, next) => {
  //check if token exists
  let token; //checking for our token request object and ensuring it starts with the "bearer" signature word ensuring its JWT type token.
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1]; //extracts the token without bearer
  }
  if (!token) {
    return next(
      unauthorizedResponse(
        "You are not logged in!, Please log in to gain access."
      )
    );
  }
  //Verify the token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET_KEY
  );
  //check if a user exists with our decoded Id
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      unauthorizedResponse("The User belonging to this token no longer exists.")
    );
  }
  //assign user to our request object.
  req.user = currentUser;
  next(); //pass to the next event
});

//role base auth
export const authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        forbiddenResponse("You do not have permission to perform this action")
      );
    }
    next();
  };
};
