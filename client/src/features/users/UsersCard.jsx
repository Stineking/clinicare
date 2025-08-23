import { RiPhoneLine } from "@remixicon/react";
import React from "react";

export default function UsersCard({ item }) {
  // Define role-based styles
  const roleStyles = {
    admin: { bg: "bg-blue-200", text: "text-blue-700" },
    doctor: { bg: "bg-green-200", text: "text-green-700" },
    nurse: { bg: "bg-yellow-200", text: "text-yellow-700" },
    patient: { bg: "bg-red-200", text: "text-red-700" },
    // Add more roles as needed
  };

  const role = item?.role?.toLowerCase();
  const { bg, text } = roleStyles[role] || { bg: "bg-gray-200", text: "text-gray-700" };

  return (
    <div className={`bg-white flex p-4 gap-3 items-start shadow rounded-xl`}>
      <div className="avatar avatar-placeholder">
        <div className="w-10 rounded-full bg-gray-300 text-gray-600 border-2 border-gray-300">
          {item?.avatar ? (
            <img
              src={item?.avatar}
              alt={item?.fullname.split(" ")[0].charAt(0)}
              referrerPolicy="no-referrer"
              loading="lazy"
              priority="high"
            />
          ) : (
            <span className="text-sm">
              {item?.fullname
                ?.split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase()}
            </span>
          )}
        </div>
      </div>
      <div>
        <h2 className="font-bold">{item?.fullname}</h2>
        <p className="text-sm text-gray-500">{item?.email}</p>
        <p className={`text-sm px-2 py- my-2 font-semibold rounded-lg ${bg} ${text} inline-block`}>
          {item?.role}
        </p>
        <p className="text-sm text-gray-500 flex items-center gap-1"> <RiPhoneLine size={17}/> {item?.phone}</p>
        <p className="text-sm text-gray-500"> Joined: {item?.joined}</p>
      </div>
    </div>
  );
}
