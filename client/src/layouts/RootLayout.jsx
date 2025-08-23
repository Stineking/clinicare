import Logo from "@/components/Logo";
import { RiCopyrightLine } from "@remixicon/react";
import { Link, NavLink, Outlet, useLocation } from "react-router";

export default function RootLayout() {
  const location = useLocation();
  const contactPage = location.pathname === "/contact";
  return (
    <div className="">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow">
        <div className="flex justify-between items-center container mx-auto py-5 px-4">
          <Logo />
          {!contactPage && (
            <>
              <div className="gap-12 hidden md:flex">
                <NavLink
                  to="/#features"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("features");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <h1>Features</h1>
                </NavLink>
                <NavLink
                  to="/#howitworks"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("howitworks");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <h1>How It Works</h1>
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-blue-500" : "text-black"
                  }
                >
                  <h1>Contact Us</h1>
                </NavLink>
              </div>
              <Link
                className="btn bg-[#2465FF] text-white hover:bg-blue-600"
                to="/account/signup"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
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
