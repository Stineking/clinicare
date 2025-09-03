import TableBody from "@/components/TableBody";
import { doctorsStatusColors, doctorsTableColumns } from "@/utils/constants";
import React, { useCallback } from "react";
import EditDoctor from "./EditDoctor";
// import { useAuth } from "@/store";

export default function Table({ doctors }) {
  const renderCell = useCallback((doctor, columnKey) => {
    const cellValue = doctor[columnKey];
    switch (columnKey) {
      case "fullname":
        return (
          <div className="">
            <h1 className="font-bold">{doctor?.userId?.fullname}</h1>
            <p className="text-gray-500 text-sm">{doctor?.userId?.email}</p>
          </div>
        );
      case "phone":
        return (
          <div className="capitalize">
            {doctor?.phone ? doctor.phone : "N/A"}
          </div>
        );
      case "specialization":
        return <div className="capitalize">{doctor?.specialization}</div>;
      case "availability":
        return (
          <div
            className={`capitalize badge badge-sm font-bold ${
              doctorsStatusColors[doctor?.availability]
            }`}
          >
            {doctor?.availability}
          </div>
        );

      case "action":
        return (
          <div className="">
            <EditDoctor doctor={doctor} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <>
      <TableBody
        tableColumns={doctorsTableColumns}
        tableData={doctors}
        renderCell={renderCell}
      />
    </>
  );
}
