// import { useAuth } from "@/store";
import { RiCloseLine, RiLogoutCircleRLine, RiMenuLine } from "@remixicon/react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { sidebarLinks } from "@/utils/constants";
import { NavLink } from "react-router";
import Logout from "./Logout";
// import { useAuth } from "@/store";

export default function Drawer({user}) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = () => setOpen(!open);
  // const user = useAuth();

  return (
    <div>
      <button onClick={toggleDrawer}>
        <RiMenuLine />
      </button>
      <div
        className={`fixed top-0 left-0 z- h-full w-full bg-white shadow-lg transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ pointerEvents: open ? "auto" : "no" }}
      >
        <button
          className="absolute top-6 right-4 textblack"
          onClick={toggleDrawer}
        >
          <RiCloseLine />
        </button>
        <div className="px-4 py-5 w-full h-full overflow-y-auto">
          <div className="flex gap-2 items-center">
            <img
              className="rounded-full h-10 w-10"
              src="https://img.daisyui.com/images/profile/demo/wonderperson@192.webp"
              alt="avatar-icon"
            />
            <div>
              <h1 className="font-bold text-lg">{user?.fullname}</h1>
              <p className="text-gray-500">Admin</p>
            </div>
          </div>
          {/* Render Sidebar only when drawer is open */}
          {open && <Sidebar />}
          <div className="overflow-y-auto h-[calc(100vh-150px)] space-y-2">
            {sidebarLinks.map((section) => (
              <div key={section.title}>
                <p className="text-xs font-semi-bold text-gray-500 my-2">
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
      </div>
    </div>
  );
}
