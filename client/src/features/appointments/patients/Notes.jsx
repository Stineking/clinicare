import Modal from "@/components/Modal";
import { RiChat2Fill, RiCloseLine } from "@remixicon/react";
import React, { useState } from "react";

export default function Notes({ appointment }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <RiChat2Fill className="text-blue-500" onClick={() => setIsOpen(true)} />
      <Modal
        id="EditAppointmentModal"
        isOpen={isOpen}
        className="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto"
      >
        <div className="flex justify-between items-center w-full">
          <h1 className="text-lg font-bold">Notes</h1>
          <RiCloseLine
            className="text-2xl cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <h1 className="mt-4">{appointment?.notes}</h1>
        {appointment?.response && (
          <div>
            <div className="divider"></div>
            <h1 className="font-semibold">Admin Response</h1>
            <h1 className="my-2">{appointment.response}</h1>
          </div>
        )}
      </Modal>
    </div>
  );
}
