import UploadImage from "@/features/settings/UploadImage";
import { useAuth } from "@/store";
import { formatDate } from "@/utils/constants";
import { validateUserSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";

export default function Account() {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validateUserSchema) });

  useEffect(() => {
    if (user) {
      setValue("fullname", user.fullname);
      setValue("email", user.email);
      setValue("phone", user.phone || "");
      setValue("dateOfBirth", formatDate(user.dateOfBirth || "", "input"));
    }
  }, [user, setValue]);

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
        Account
      </h1>
      <div className="flex items-center gap-3">
        <div>
          <UploadImage />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:mt-8">
          <button className="btn w-35">Change Image</button>
          <>JPG, PNG, GIF (max 5mb)</>
        </div>
      </div>
      <form>
        <div className="grid grid-cols-12 border-b border-gray-300 pt-2 pb-8">
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Full name</legend>
              <input
                type="text"
                className="input w-full md:w-115"
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
                className="input w-full md:w-115"
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
          <div className="flex md:hidden gap-10 pt-4">
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
      </form>
      <div className="block md:flex justify-between pt-2 items-center">
        <div className="">
          <h1 className="font-bold text-xl">Delete account</h1>
          <p className="pb-4 md:pb-0 md:w-115 text-[13px] md:text-[16px]">
            When you delete your account, you loose access to medical history
            and appointments. We permanently delete your account and alll
            associated data.
          </p>
        </div>
        <button
          className="btn bg-red-500 hover:bg-red-600 text-white w-full md:w-35"
          type="button"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
