import { getTimeBasedGreeting } from "@/utils/constants";
import { RiSearchLine } from "@remixicon/react";
import React from "react";

export default function Navbar({ user }) {
  const greeting = getTimeBasedGreeting();
  return (
    <div className="hidden lg:block sticky top-2 right-0 z-30 left-[200px] bg-white/50 backdrop-blur supports-[backdrop-filter]:bg-white/50 px-4 rounded-full border border-zinc-200">
    <div className=" mx-auto container">
      <div className="h-13 flex justify-between items-center">
        <h1 className="text-lg font-bold">
          {greeting}, {user?.fullname}!👋
        </h1>
        <div>
          <div className="flex items-center gap-4 relative">
            <RiSearchLine className="absolute left-3 text-gray-500" size={22} />
            <input
              type="search"
              placeholder="Search..."
              className="border border-gray-400 pl-10 pr-4 py-2 rounded text-sm focus:outline-none"
            />
            <div className="flex gap-2 items-center">
              <div className="avatar avatar-placeholder">
                <div className="w-10 rounded-full bg-gray-300 text-gray-600 border-2 border-gray-300">
                  {user?.avatar ? (
                    <img
                      src={user?.avatar}
                      alt={user?.fullname.split(" ")[0].charAt(0)}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      priority="high"
                    />
                  ) : (
                    <span className="text-sm">
                      {user?.fullname
                        ?.split(" ")
                        .map((name) => name[0])
                        .join(" ")
                        .toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
