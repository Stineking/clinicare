import { updatePasswordSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

export default function Password() {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);

  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(updatePasswordSchema) });

   const navigate = useNavigate();
  const location = useLocation();

  //redirect to account settings page
  useEffect(() => {
    location.pathname === "dashboard/settings" &&
      navigate("dashboard/settings/account");
  }, [location.pathname, navigate]);

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-2xl border-b border-gray-300 pb-2">
        Update Password
      </h1>
      <div className="md:flex flex-col justify-center items-center">
        <div>
          <fieldset className="fieldset relative">
            <legend className="fieldset-legend">Password</legend>
            <input
              type={isVisible ? "text" : "password"}
              className="input w-full md:w-[450px]"
              placeholder="Password"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute font-semibold cursor-pointer top-1 left-66 md:left-100 inset-0"
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
            <legend className="fieldset-legend">New Password</legend>
            <input
              type={isVisible ? "text" : "password"}
              className="input w-full md:w-[450px]"
              placeholder="New Password"
              {...register("newPassword")}
            />
            <button
              type="button"
              className="absolute font-semibold cursor-pointer top-1 left-66 md:left-100 inset-0"
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
              type={isVisible ? "text" : "password"}
              className="input w-full md:w-[450px]"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              className="absolute font-semibold cursor-pointer top-1 left-66 md:left-100 inset-0"
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
        <p className="text-gray-700 mt-2 text-[15px]">Note: You will be logged out after updating your password.</p>
        <div className="flex md:hidden gap-10 pt-6">
            <button
              type="button"
              className="btn btn-outline w-[140px] border border-gray-300"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-blue-500 text-white font-bold border border-gray-300 p-2 rounded-md cursor-pointer w-[140px]"
            >
              Save
            </button>
          </div>
      </div>
    </div>
  );
}
