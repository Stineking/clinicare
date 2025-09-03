import { updateUserRole } from "@/api/auth";
import ErrorAlert from "@/components/errorAlert";
import Modal from "@/components/Modal";
import { useAuth } from "@/store";
import { validateUpdateUserRoleSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Edit({ item }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, showSuccess] = useState(false);
  const { accessToken } = useAuth();
  const [showDoctor, setShowDoctor] = useState(false);
  const [msg, setMsg] = useState("");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validateUpdateUserRoleSchema) });

  const role = ["admin", "staff", "doctor", "nurse", "patient"];
  const availability = ["available", "unavailable", "on leave", "sick"];
  const specialization = [
    "Cardiology",
    "Dermatology",
    "Gastroenterology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Urology",
  ];

  useEffect(() => {
    if (item) {
      setValue("role", item.role);
    }
  }, [item, setValue]);

  const fieldWatch = watch("role");
  useEffect(() => {
    if (fieldWatch === "doctor") {
      setShowDoctor(true);
    } else {
      setShowDoctor(false);
    }
  }, [fieldWatch]);

  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: (response) => {
      if (response.success) {
        setMsg(response?.message);
        showSuccess(true);
      }
    },
    onError: (error) => {
      console.error(error);
      setError(error?.response?.data?.message || "Error updating user role");
    },
  });

  const onSubmit = async (role) => {
    mutation.mutate({ userId: item._id, role, accessToken });
  };

  const handleClose = async () => {
    await queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
    setIsOpen(false);
    showSuccess(false);
  };

  return (
    <>
      <button
        className="btn btn-sm btn-outline border-[0.2px] border-gray-500"
        onClick={() => setIsOpen(true)}
        disabled={item?.role === "patient"}
      >
        Edit
      </button>
      <Modal
        id="editModal"
        isOpen={isOpen}
        className="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto"
      >
        {error && <ErrorAlert error={error} />}
        {success ? (
          <>
            <div className="p-4 text-center">
              <img
                src="/Success.svg"
                alt="success"
                className="w-full h-[200px]"
              />
              <h1 className="text-2xl font-bold">Congratulations!</h1>
              <p className="text-gray-600">{msg}</p>
              <button
                className="btn my-4 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
                size="lg"
                onClick={handleClose}
              >
                Continue to Users
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <form className="gap-2" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="font-bold text-lg">Update user data</h1>
              <div className="">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Role</legend>
                  <select
                    name="role"
                    id=""
                    defaultValue={""}
                    className="select capitalize w-full"
                    {...register("role")}
                    disabled={isSubmitting}
                  >
                    <option value="">Select Role</option>
                    {role
                      ?.filter((role) => role !== "patient")
                      .map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                </fieldset>
                {errors.role?.message && (
                  <span className="text-xs text-red-500">
                    {errors.role?.message}
                  </span>
                )}
              </div>
              {showDoctor && (
                <>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-12 md:col-span-6">
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                          Specialization
                        </legend>
                        <select
                          name="specialization"
                          id=""
                          defaultValue={""}
                          className="select capitalize w-full"
                          {...register("specialization")}
                          disabled={isSubmitting}
                        >
                          <option value="">Select Specialization</option>
                          {specialization?.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </fieldset>
                      {errors.specialization?.message && (
                        <span className="text-xs text-red-500">
                          {errors.specialization?.message}
                        </span>
                      )}
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                          Availability
                        </legend>
                        <select
                          name="availability"
                          id=""
                          defaultValue={""}
                          className="select capitalize w-full"
                          {...register("availability")}
                          disabled={isSubmitting}
                        >
                          <option value="">Select Availability</option>
                          {availability?.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </fieldset>
                      {errors.availability?.message && (
                        <span className="text-xs text-red-500">
                          {errors.availability?.message}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}
              <div className="mt-4 mb-2 flex justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-outline border-[0.2px] border-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn  bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={mutation.isPending || isSubmitting}
                >
                  {mutation.isPending || isSubmitting
                    ? "Updating..."
                    : "Update"}
                </button>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </>
  );
}
