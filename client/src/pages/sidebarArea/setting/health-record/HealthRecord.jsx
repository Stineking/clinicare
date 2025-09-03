import { getPatient, updatePatient } from "@/api/patients";
import ErrorAlert from "@/components/ErrorAlert";
import { LazyLoader } from "@/components/LazyLoader";
import useMetaArgs from "@/hooks/useMeta";
import { useAuth } from "@/store";
import { bloodGroup, formatDate } from "@/utils/constants";
import { validatePatientSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function HealthRecord() {
  useMetaArgs({
    title: "Health Record - Clinicare",
    description: "Health settings for your Clinicare account",
    keywords: "Clinicare, settings, health-record, information",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validatePatientSchema) });

  const { user, accessToken } = useAuth();

  const [err, setError] = useState(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["patient", accessToken],
    queryFn: () => getPatient(accessToken),
  });
  const patientData = data?.data?.data;

  useEffect(() => {
    if (user) {
      setValue("fullname", user.fullname);
      setValue("email", user.email);
      setValue("phone", user.phone || "");
      setValue("dateOfBirth", formatDate(user.dateOfBirth || "", "input"));
    }
    if (patientData) {
      setValue("gender", patientData?.gender || "");
      setValue("bloodGroup", patientData?.bloodGroup || "");
      setValue("address", patientData?.address || "");
      setValue("emergencyContact", patientData?.emergencyContact || "");
      setValue(
        "emergencyContactPhone",
        patientData?.emergencyContactPhone || ""
      );
      setValue(
        "emergencyContactRelationship",
        patientData?.emergencyContactRelationship || ""
      );
    }
  }, [user, setValue, patientData]);

  const mutation = useMutation({
    mutationFn: updatePatient,
    onSuccess: (res) => {
      if (res.status === 200) {
        toast.success(res.data?.message);
        queryClient.invalidateQueries({ queryKey: ["patient"] });
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Error updating your profile");
    },
  });

  const gender = ["male", "female", "other"];

  const bloodGroupOptions = Object.entries(bloodGroup).map(([key, value]) => ({
    name: key,
    id: value,
  }));

  if (isPending) {
    return <LazyLoader />;
  }

  const onSubmit = async (formData) => {
    mutation.mutate({ patientId: patientData._id, formData, accessToken });
  };
  return (
    <div className="space-y-6">
      <h1 className="font-bold text-2xl border-b border-gray-300 pb-2">
        Health Information
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} id="/dashboard/settings/health">
        {isError ||
          (err && <ErrorAlert error={error?.response?.data?.message || err} />)}
        <div className="grid grid-cols-12 gap-3">
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
                placeholder="Phone"
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
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <select
                name="gender"
                id=""
                defaultValue={""}
                className="select capitalize w-full"
                {...register("gender")}
                disabled={isSubmitting}
              >
                <option value="">Select Gender</option>
                {gender?.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </fieldset>
            {errors.gender?.message && (
              <span className="text-xs text-red-500">
                {errors.gender?.message}
              </span>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Blood group</legend>
              <select
                name="bloodGroup"
                id=""
                defaultValue={""}
                disabled={isSubmitting}
                {...register("bloodGroup")}
                className="select capitalize w-full"
              >
                <option value="">Select Blood Group</option>
                {bloodGroupOptions?.map((option, index) => (
                  <option key={index} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </fieldset>
            {errors.bloodGroup?.message && (
              <span className="text-xs text-red-500">
                {errors.bloodGroup?.message}
              </span>
            )}
          </div>
          <div className="col-span-12">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Address</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Address"
                {...register("address")}
              />
            </fieldset>
            {errors.address?.message && (
              <span className="text-xs text-red-500">
                {errors.address?.message}
              </span>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Emergency contact</legend>
              <input
                type="text"
                className="input text-xs w-full"
                placeholder="Emergency contact"
                {...register("emergencyContact")}
              />
            </fieldset>
            {errors.emergencyContact?.message && (
              <span className="text-xs text-red-500">
                {errors.emergencyContact?.message}
              </span>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Emergency contact phone
              </legend>
              <input
                type="text"
                className="input text-xs w-full"
                placeholder="Emergency contact phone"
                {...register("emergencyContactPhone")}
              />
            </fieldset>
            {errors.emergencyContactPhone?.message && (
              <span className="text-xs text-red-500">
                {errors.emergencyContactPhone?.message}
              </span>
            )}
          </div>
          <div className="col-span-12 md:col-span-6">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">
                Emergency contact relationship
              </legend>
              <input
                type="text"
                className="input text-xs w-full"
                placeholder="Emergency contact relationship"
                {...register("emergencyContactRelationship")}
              />
            </fieldset>
            {errors.emergencyContactRelationship?.message && (
              <span className="text-xs text-red-500">
                {errors.emergencyContactRelationship?.message}
              </span>
            )}
          </div>
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
            {isSubmitting || mutation.isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
