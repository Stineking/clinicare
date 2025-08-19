import { useAuth } from "@/store";
import React from "react";

export default function UploadImage() {
  const { user } = useAuth();
  return (
    <>
      <h1 className="text-gray-500 font-bold hidden md:block">Your photo</h1>
      <div className="mt-2 flex gap-4 items-center">
        <div className="avatar avatar-placeholder relative">
          <div className="w-20 rounded-full bg-gray-300 text-gray-600">
            {user?.avatar ? (
              <img
                src={user?.avatar}
                alt={user?.fullname.split(" ")[0].charAt(0)}
                referrerPolicy="no-referrer"
              />
            ) : (
              <span className="text-xl">
                {user?.fullname
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
