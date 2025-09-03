import { bookAppointment } from "@/api/appointment";
import ErrorAlert from "@/components/ErrorAlert";
import Modal from "@/components/Modal";
import { useAuth } from "@/store";
import { validateBookAppointmentSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function BookAppointment() {
  const [isOpen, setIsOpen] = useState(false);
  const [err, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [msg, setMsg] = useState(null);
  const queryClient = useQueryClient();
  const { accessToken } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validateBookAppointmentSchema) });

  const appointmentTime = ["10:00 AM", "1:00 PM", "3:00 PM"];

  const mutation = useMutation({
    mutationFn: bookAppointment,
    onSuccess: async (response) => {
      if (response.status === 201) {
        setMsg(response?.data?.message);
        setShowSuccess(true);
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Error booking appointment");
    },
  });

  const resetModal = async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: ["getPatientAppointments"],
      }),
      queryClient.invalidateQueries({
        queryKey: ["getAllAppointments"],
      }),
    ]);
    setIsOpen(false);
    setShowSuccess(false);
    setError(null);
    reset();
  };

  const onSubmit = async (formData) => {
    mutation.mutate({ formData, accessToken });
  };
  return (
    <>
      <button
        className="btn bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer border border-gray-300"
        onClick={() => setIsOpen(true)}
      >
        Book Appointment
      </button>
      <Modal
        id="BookAppointmentModal"
        isOpen={isOpen}
        className="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto"
      >
        {err && <ErrorAlert error={err} />}
        {showSuccess ? (
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
                onClick={resetModal}
              >
                Continue to Appointments
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-2 w-full">
              <h1 className="text-lg font-bold">Book Appointment</h1>
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
    </>
  );
}
