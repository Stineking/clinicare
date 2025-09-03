import { updateDoctor } from "@/api/doctor";
import Modal from "@/components/Modal";
import { useAuth } from "@/store";
import { validateDoctorAvailabilitySchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiEditLine } from "@remixicon/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditDoctor({ doctor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, showSuccess] = useState(false);
  const { accessToken } = useAuth();
  const [msg, setMsg] = useState("");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validateDoctorAvailabilitySchema) });

  const availability = ["available", "unavailable", "on leave", "sick"];

  useEffect(() => {
    if (doctor) {
      setValue("availability", doctor?.availability || "");
    }
  }, [doctor, setValue]);

  const mutation = useMutation({
    mutationFn: updateDoctor,
    onSuccess: (response) => {
      if (response.status === 200) {
        setMsg(response?.data?.message);
        showSuccess(true);
        reset();
      }
    },
    onError: (error) => {
      console.error(error);
      setError(error?.response?.data?.message || "Error updating doctor");
    },
  });

  const onSubmit = async (formData) => {
    mutation.mutate({ doctorId: doctor._id, formData, accessToken });
  };

  const handleClose = async () => {
    await queryClient.invalidateQueries({ queryKey: ["getAllDoctors"] });
    setIsOpen(false);
    showSuccess(false);
  };

  return (
    <>
      <RiEditLine className="text-blue-500" onClick={() => setIsOpen(true)} />
      <Modal
        id="editDoctorModal"
        isOpen={isOpen}
        className="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto"
      >
        <div>
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
                  Continue to Doctors
                </button>
              </div>
            </>
          ) : (
            <form className="gap-2" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="font-bold text-lg">Edit doctor status</h1>
              <div className="">
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Status</legend>
                  <select
                    name="status"
                    id=""
                    //   defaultValue={""}
                    className="select capitalize w-full"
                    {...register("availability")}
                    disabled={isSubmitting}
                  >
                    <option value="">Select Status</option>
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
          )}
        </div>
      </Modal>
    </>
  );
}
