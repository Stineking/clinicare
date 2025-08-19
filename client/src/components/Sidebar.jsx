import React from "react";
import Logo from "./Logo";
import { sidebarLinks } from "@/utils/constants";
import { NavLink } from "react-router";

import Logout from "./Logout";

export default function Sidebar() {
  return (
    <div className="hidden lg:block min-h-[100vh] fixed z-50 w-[200px]">
      <Logo classname="pt-3" />
      <div className="overflow-y-auto h-[calc(100vh-150px)] space-y-2">
        {sidebarLinks.map((section) => (
          <div key={section.title}>
            <p className="text-xs font-semi-bold text-gray-500 my-4">
              {section.title}
            </p>
            <div className="">
              {section.links.map((link) => (
                <NavLink
                  key={link.id}
                  to={link.to}
                  className={({ isActive }) =>
                    `${
                      isActive
                        ? "text-blue-500 font-bold bg-blue-100  rounded-full"
                        : ""
                    } p-1.5 flex items-center gap-2 hover:text-blue-500 transition-all duration-300`
                  }
                  viewTransition
                  end
                >
                  <link.icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Logout />
    </div>
  );
}
