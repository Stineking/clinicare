import { resetPassword } from "@/api/auth";
import ErrorAlert from "@/components/ErrorAlert";
import useMetaArgs from "@/hooks/useMeta";
import { validateResetPasswordSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiLockFill } from "@remixicon/react";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

export default function Login() {
  useMetaArgs({
    title: "Reset Password - Clinicare",
    description: "Reset Your Clinicare account password",
    keywords: "Clinicare, reset-password-account, account-reset, account",
  });

  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  //look for values on our url bar
  const email = searchParams.get("email");
  const token = searchParams.get("token");


  const [isVisible, setIsVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };
  const toggleConfirmPassword = () => {
    setConfirmVisible((prev) => !prev);
  };

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (response) => {
      //what you want to do if api call is a success.
      toast.success(response?.data?.message);
      navigate("/account/signin");
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validateResetPasswordSchema) });

  const onSubmit = async (data) => {
    const userData = { ...data, email, token };
    mutation.mutate(userData);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] container mx-auto flex justify-center pt-20 items-center">
      <div className="px-4 md:px-0">
        <form
          className="bg-white px-5 py-3 md:p flex flex-col justify-center rounded-xl shadow max-w[400px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <RiLockFill
            className="mx-auto my-2 border rounded-full p-2 border-blue-500 text-blue-500 shadow-lg"
            size={40}
          />
          <h1 className="font-bold text-2xl text-center py-2">
            Confirm New Password
          </h1>
          <p className="text-center text-[16px] md:text-[15px] text-zinc-600 w-80 pb-3">
            Please enter a new password. Your new password must be different
            from your previous password.
          </p>
          {error && <ErrorAlert error={error} />}
          <div>
            <fieldset className="fieldset relative">
              <legend className="fieldset-legend">Password</legend>
              <input
                type={isVisible ? "text" : "password"}
                className="input"
                placeholder="Password"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute font-semibold cursor-pointer top-1 left-66 inset-0"
                onClick={togglePassword}
              >
                {isVisible ? "Hide" : "Show"}
              </button>
            </fieldset>
            {errors.password?.message && (
              <span className="text-xs text-red-500">
                {errors.password?.message}
              </span>
            )}
          </div>
          <div>
            <fieldset className="fieldset relative">
              <legend className="fieldset-legend">Confirm Password</legend>
              <input
                type={confirmVisible ? "text" : "password"}
                className="input"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                className="absolute font-semibold cursor-pointer top-1 left-66 inset-0"
                onClick={toggleConfirmPassword}
              >
                {confirmVisible ? "Hide" : "Show"}
              </button>
            </fieldset>
            {errors.password?.message && (
              <span className="text-xs text-red-500">
                {errors.password?.message}
              </span>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting || mutation.isPending}
              className="bg-blue-500  hover:bg-blue-600 w-full py-2 text-white text-[14px] font-bold rounded-sm my-4"
            >
              {isSubmitting || mutation.isPending
                ? "Resetting..."
                : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
