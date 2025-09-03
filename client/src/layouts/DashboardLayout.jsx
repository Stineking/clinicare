import MobileNav from "@/components/MobileNav";
import Navbar from "@/components/DashboardNav";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/store";
import React from "react";
import { Outlet } from "react-router";

export default function DashboardLayout() {
  const { user } = useAuth();

  return (
    <div className="bg-slate-100">
      <div className="min-h-[100vh] bg-slate-100 lg:flex mx-auto lg:py-2 lg:px-4">
        <Sidebar user={user} />
        <MobileNav user={user} />
        <div className="px-4 lg:px-0 py-5 lg:py-0 lg:ml-[200px] lg:flex-1">
          <Navbar user={user} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
