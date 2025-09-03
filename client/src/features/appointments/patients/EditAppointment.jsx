import { updatePatientsAppointment } from "@/api/appointment";
import ErrorAlert from "@/components/ErrorAlert";
import Modal from "@/components/Modal";
import { useAuth } from "@/store";
import { formatDate } from "@/utils/constants";
import { validateBookAppointmentSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiEditLine } from "@remixicon/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditAppointment({ appointment }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const [success, showSuccess] = useState(false);
  const [msg, setMsg] = useState(null);
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validateBookAppointmentSchema) });

  const appointmentTime = ["10:00 AM", "1:00 PM", "3:00 PM"];

  useEffect(() => {
    if (appointment) {
      setValue(
        "appointmentDate",
        formatDate(appointment.appointmentDate, "input")
      );
      setValue("appointmentTime", appointment.appointmentTime);
      setValue("notes", appointment.notes);
    }
  }, [appointment, setValue]);

  const mutation = useMutation({
    mutationFn: updatePatientsAppointment,
    onSuccess: (response) => {
      if (response.status) {
        setMsg(response?.data?.message);
        showSuccess(true);
      }
    },
    onError: (error) => {
      console.error(error);
      setError(error?.response?.data?.message || "Error updating appointment");
    },
  });

  const onSubmit = async (formData) => {
    mutation.mutate({ appointmentId: appointment._id, formData, accessToken });
  };

  const handleClose = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["getPatientsAppointments"],
    });
    setIsOpen(false);
    showSuccess(false);
    reset();
  };
  return (
    <div>
      <RiEditLine className="text-blue-500" onClick={() => setIsOpen(true)} />
      <Modal
        id="EditAppointmentModal"
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
                Continue to Appointments
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 w-full">
              <h1 className="text-lg font-bold">Edit Appointment</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-12 gap-2 mt-4">
                <div className="col-span-12 md:col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      Appointment Date
                    </legend>
                    <input
                      type="date"
                      className="input w-full"
                      placeholder="dd/mm/yyyy"
                      {...register("appointmentDate")}
                    />
                  </fieldset>
                  {errors.appointmentDate?.message && (
                    <span className="text-xs text-red-500">
                      {errors.appointmentDate?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      Appointment Time
                    </legend>
                    <select
                      name="appointmentTime"
                      id=""
                      defaultValue={""}
                      className="select capitalize w-full"
                      {...register("appointmentTime")}
                      disabled={isSubmitting}
                    >
                      <option value="">Select Appointment Time</option>
                      {appointmentTime?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  {errors.appointmentTime?.message && (
                    <span className="text-xs text-red-500">
                      {errors.appointmentTime?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-12">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Note</legend>
                    <textarea
                      className="input w-full pt-1 min-h-[80px]"
                      placeholder="Enter short notes or ailment"
                      {...register("notes")}
                    />
                  </fieldset>
                  {errors.notes?.message && (
                    <span className="text-xs text-red-500">
                      {errors.notes?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 mb-2 flex md:justify-end gap-3">
                <button
                  type="button"
                  className="btn btn-outline w-[150px] border-[0.2px] border-gray-500"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-blue-500 hover:bg-blue-600 text-white w-[150px]"
                  disabled={mutation.isPending || isSubmitting}
                >
                  {mutation.isPending || isSubmitting ? "Booking..." : "Book"}
                </button>
              </div>
            </form>
          </>
        )}
      </Modal>
    </div>
  );
}
