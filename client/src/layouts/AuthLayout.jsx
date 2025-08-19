import Logo from "@/components/Logo";
import { RiCopyrightLine } from "@remixicon/react";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen bg-[#F1F5F9]">
      <div className="fixed container mx-auto top-0 left-0 right-0 z-50 py-4 px-4 flex justify-between items-center">
        <Logo />
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
