import {
  appointmentsStatusColors,
  appointmentsTableColumns,
  formatDate,
} from "@/utils/constants";
import React, { useCallback } from "react";
import TableBody from "@/components/TableBody";
import ConfirmAppointment from "./ConfirmAppointment";
import Response from "./Response";

export default function Table({ appointment }) {
  const renderCell = useCallback((appointment, columnKey) => {
    const cellValue = appointment[columnKey];
    switch (columnKey) {
      case "appointmentId":
        return (
          <>
            <h1 className="">{appointment?._id}</h1>
          </>
        );
      case "patientName":
        return (
          <div className="capitalize">{appointment?.patientId?.fullname}</div>
        );
      case "doctor":
        return (
          <div className="capitalize font-semibold">
            {appointment?.doctorId?.fullname
              ? `Dr. ${appointment?.doctorId?.fullname}`
              : "Not Assigned"}
          </div>
        );
      case "appointmentDate":
        return (
          <div className="capitalize">
            {formatDate(appointment?.appointmentDate)}
          </div>
        );
      case "appointmentTime":
        return <div className="capitalize">{appointment?.appointmentTime}</div>;
      case "status":
        return (
          <div
            className={`capitalize badge badge-sm font-bold ${
              appointmentsStatusColors[appointment?.status]
            }`}
          >
            {appointment?.status}
          </div>
        );
      case "action":
        return (
          <div className="flex gap-4 items-center">
            <Response appointment={appointment} />
            <ConfirmAppointment appointment={appointment} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <TableBody
        tableColumns={appointmentsTableColumns}
        tableData={appointment}
        renderCell={renderCell}
      />
    </>
  );
}
