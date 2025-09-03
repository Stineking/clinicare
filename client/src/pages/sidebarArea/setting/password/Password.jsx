import { logout, updateUserPassword } from "@/api/auth";
import ErrorAlert from "@/components/ErrorAlert";
import useMetaArgs from "@/hooks/useMeta";
import { useAuth } from "@/store";
import { updatePasswordSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

export default function Password() {
  useMetaArgs({
    title: "Password Settings - Clinicare",
    description: "Password settings for your Clinicare account",
    keywords: "Clinicare, password, settings",
  });

  const [isVisible, setIsVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };
  const toggleNewPassword = () => {
    setNewVisible((prev) => !prev);
  };
  const toggleConfirmPassword = () => {
    setConfirmVisible((prev) => !prev);
  };

  const navigate = useNavigate();
  const location = useLocation();

  //redirect to account settings page
  useEffect(() => {
    location.pathname === "dashboard/settings" &&
      navigate("dashboard/settings/account");
  }, [location.pathname, navigate]);

  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const { accessToken, setAccessToken } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(updatePasswordSchema) });

  const mutation = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: async (response) => {
      if (response.status === 200) {
        toast.success(response?.data?.message);
        //After password change, log the user out
        try {
          const res = await logout(accessToken);
          if (res.status === 200) {
            setAccessToken(null);
            queryClient.invalidateQueries({ queryKey: ["auth_user"] });
          }
        } catch {
          //fall back to local storage to cleanup even if Api Logout fails
          queryClient.invalidateQueries({ queryKey: ["auth_user"] });
          setAccessToken(null);
          navigate("/account/signin");
        }
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Error updating password");
    },
  });
  const onSubmit = async (userData) => {
    mutation.mutate({ userData, accessToken });
  };

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-2xl border-b border-gray-300 pb-2">
        Update Password
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="/dashboard/settings/password"
        className=""
      >
        <div className="md:flex flex-col justify-center items-center">
          {error && <ErrorAlert error={error} />}
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
                className="absolute font-semibold cursor-pointer top-3 right-3"
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
                type={newVisible ? "text" : "password"}
                className="input w-full md:w-[450px]"
                placeholder="New Password"
                {...register("newPassword")}
              />
              <button
                type="button"
                className="absolute font-semibold cursor-pointer top-3 right-3"
                onClick={toggleNewPassword}
              >
                {newVisible ? "Hide" : "Show"}
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
                className="input w-full md:w-[450px]"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                className="absolute font-semibold cursor-pointer top-3 right-3"
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
          <p className="text-gray-700 mt-2 text-[15px]">
            Note: You will be logged out after updating your password.
          </p>
        </div>
        <div className="flex md:hidden justify-between md:justify-end gap-3 pt-4">
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
            disabled={isSubmitting || mutation.isPending}
          >
            {isSubmitting || mutation.isPending ? "Saving" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
