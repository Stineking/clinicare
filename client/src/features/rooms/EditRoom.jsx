import { updateRoom } from "@/api/room";
import Modal from "@/components/Modal";
import { useAuth } from "@/store";
import { validateRoomSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiEditLine } from "@remixicon/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditRoom({ room }) {
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
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validateRoomSchema) });

  const roomType = ["Regular", "VIP", "ICU", "Deluxe", "Suite"];
  const roomStatus = ["available", "occupied", "maintenance"];

  useEffect(() => {
    if (room) {
      setValue("roomNumber", room.roomNumber);
      setValue("roomType", room.roomType);
      setValue("roomPrice", room.roomPrice);
      setValue("roomStatus", room.roomStatus);
      setValue("roomDescription", room.roomDescription);
      setValue("roomCapacity", room.roomCapacity);
    }
  }, [room, setValue]);

  const mutation = useMutation({
    mutationFn: updateRoom,
    onSuccess: (response) => {
      if (response.status === 200) {
        setMsg(response?.data?.message);
        showSuccess(true);
      }
    },
    onError: (error) => {
      console.error(error);
      setError(error?.response?.data?.message || "Error updating room");
    },
  });

  const onSubmit = async (formData) => {
    mutation.mutate({ roomId: room._id, formData, accessToken });
  };

  const handleClose = async () => {
    await queryClient.invalidateQueries({ queryKey: ["getAllRooms"] });
    setIsOpen(false);
    showSuccess(false);
  };

  return (
    <>
      <RiEditLine className="text-blue-500" onClick={() => setIsOpen(true)} />
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
                Continue to Rooms
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-2 w-full">
            <form className="gap-2" onSubmit={handleSubmit(onSubmit)}>
              <h1 className="font-bold text-lg">
                Update room {room?.roomNumber}
              </h1>
              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-12 md:col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Room Number</legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Room Number (1-20)"
                      {...register("roomNumber")}
                    />
                  </fieldset>
                  {errors.roomNumber?.message && (
                    <span className="text-xs text-red-500">
                      {errors.roomNumber?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Room Type</legend>
                    <select
                      name="roomType"
                      id=""
                      defaultValue={""}
                      className="select capitalize"
                      {...register("roomType")}
                      disabled={isSubmitting}
                    >
                      <option value="">Select Room Type</option>
                      {roomType?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  {errors.roomType?.message && (
                    <span className="text-xs text-red-500">
                      {errors.roomType?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Room Price</legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Room Price"
                      {...register("roomPrice")}
                    />
                  </fieldset>
                  {errors.roomPrice?.message && (
                    <span className="text-xs text-red-500">
                      {errors.roomPrice?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Room Status</legend>
                    <select
                      name="roomStatus"
                      id=""
                      defaultValue={""}
                      className="select capitalize"
                      {...register("roomStatus")}
                      disabled={isSubmitting}
                    >
                      <option value="">Select Room Status</option>
                      {roomStatus?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  {errors.roomStatus?.message && (
                    <span className="text-xs text-red-500">
                      {errors.roomStatus?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-12">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      Room Description
                    </legend>
                    <input
                      type="text"
                      className="input w-full md:w-auto"
                      placeholder="Room Description"
                      {...register("roomDescription")}
                    />
                  </fieldset>
                  {errors.roomDescription?.message && (
                    <span className="text-xs text-red-500">
                      {errors.roomDescription?.message}
                    </span>
                  )}
                </div>
                <div className="col-span-12 md:col-span-6">
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">Room Capacity</legend>
                    <input
                      type="text"
                      className="input"
                      placeholder="Room Capacity (1-5)"
                      {...register("roomCapacity")}
                    />
                  </fieldset>
                  {errors.roomCapacity?.message && (
                    <span className="text-xs text-red-500">
                      {errors.roomCapacity?.message}
                    </span>
                  )}
                </div>
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
          </div>
        )}
      </Modal>
    </>
  );
}
