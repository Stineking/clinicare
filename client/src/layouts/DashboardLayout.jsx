import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/store";
import React from "react";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="bg-slate-100">
      <div className="min-h-[100vh] bg-slate-100 lg:flex max-w-[1500px] mx-auto lg:py-2 lg:px-4">
        <Sidebar />
        <MobileNav user={user} />
        <div className="px-4 lg:px-0 py-5 lg:py-0 lg:ml-[200px] lg:flex-1">
          <Navbar user={user} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
