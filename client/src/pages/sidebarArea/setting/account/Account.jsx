import { updateUserProfile } from "@/api/auth";
import ErrorAlert from "@/components/ErrorAlert";
import DeleteAccount from "@/features/settings/DeleteAccount";
import UploadImage from "@/features/settings/UploadImage";
import useMetaArgs from "@/hooks/useMeta";
import { useAuth } from "@/store";
import { formatDate } from "@/utils/constants";
import { validateUserSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function Account() {
  useMetaArgs({
    title: "Account Settings - Clinicare",
    description: "Account settings for your Clinicare account",
    keywords: "Clinicare, User-Account, settings",
  });

  const { user, accessToken } = useAuth();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validateUserSchema) });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (user) {
      setValue("fullname", user.fullname);
      setValue("email", user.email);
      setValue("phone", user.phone || "");
      setValue("dateOfBirth", formatDate(user.dateOfBirth || "", "input"));
    }
  }, [user, setValue]);

  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: async (response) => {
      if (response.status === 200) {
        toast.success(response?.data?.message);
        queryClient.invalidateQueries({ queryKey: ["auth_user"] });
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Error updating your profile");
    },
  });

  const onSubmit = async (userData) => {
    mutation.mutate({ userData, accessToken });
  };

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-2xl border-b border-gray-300 pb-2">
        Account
      </h1>
      <>
        <UploadImage />
      </>
      {error && <ErrorAlert error={error} />}
      <form
        id="/dashboard/settings/account"
        className="border-b border-gray-300 pt-2 pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Full name</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Full name"
                {...register("fullname")}
              />
            </fieldset>
            {errors.fullname?.message && (
              <span className="text-xs text-red-500">
                {errors.fullname?.message}
              </span>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
                {...register("email")}
              />
            </fieldset>
            {errors.email?.message && (
              <span className="text-xs text-red-500">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Phone</legend>
              <input
                type="tel"
                className="input w-full"
                placeholder="phone"
                {...register("phone")}
              />
            </fieldset>
            {errors.phone?.message && (
              <span className="text-xs text-red-500">
                {errors.phone?.message}
              </span>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Date of birth</legend>
              <input
                type="date"
                className="input w-full"
                placeholder="dd/mm/yyyy"
                {...register("dateOfBirth")}
              />
            </fieldset>
            {errors.dateOfBirth?.message && (
              <span className="text-xs text-red-500">
                {errors.dateOfBirth?.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex md:hidden flex-wrap justify-between  md:justify-end gap-3 pt-4">
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
            {isSubmitting || mutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
      <div className="block md:flex justify-between pt-2 items-center p-4">
        <div className="">
          <h1 className="font-bold text-xl">Delete account</h1>
          <p className="flex-1 pb-4 md:pb-0 md:w-75 lg:w-115 text-[13px] md:text-[16px]">
            When you delete your account, you loose access to medical history
            and appointments. We permanently delete your account and alll
            associated data.
          </p>
        </div>
        <DeleteAccount className="" />
      </div>
    </div>
  );
}
