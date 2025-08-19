import Logo from "@/components/Logo";
import Logout from "@/components/Logout";
import { RiCopyrightLine } from "@remixicon/react";
import React from "react";
import { Outlet } from "react-router";

export default function OnboardingLayout() {
  return (
    <div className="relative min-h-screen bg-slate-100">
      <div className="fixed top-0 left-0 bg-slate-100 right-0 z-50 container mx-auto py-1 px-4 flex justify-between items-center">
        <Logo />
        {/* <button className="btn bg-red-500 hover:bg-red-600 text-white">Logout</button> */}
        <Logout />
      </div>
      <Outlet />
      <div className="bg-[#0232A2] text-white">
        <div className="container mx-auto py-5 px-4 flex items-center justify-center font-bold gap-1 md:justify-start">
          <>Copyright</>
          <RiCopyrightLine size={18} />
          <span className="text-sm">
            {new Date().getFullYear()} Clinicare. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  );
}
