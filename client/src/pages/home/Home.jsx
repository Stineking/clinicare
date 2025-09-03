import useMetaArgs from "@/hooks/useMeta";
import { RiDiscussFill } from "@remixicon/react";
import React from "react";
import { Link } from "react-router";

export default function Home() {
  useMetaArgs({
    title: "Home, Clinicare",
    description: "Welcome To Clinicare Online Hub.",
    keywords: "Health, Clinic, Hospital",
  });

  return (
    <main className="">
      <div className=" bg-gradient-to-bl from-[#E2EBFF] to-[#E5EDFF]">
        <div className="pt-45 mx-auto items-center w-[1440px] max-w-full">
          <h1 className="font-bold text-4xl md:text-[38px] text-center">
            Welcome to <br />{" "}
            <span className="text-6xl md:text-[70px] text-[#FF5703]">
              Clinicare
            </span>
          </h1>
          <p className="pt-4 text-zinc-800 text-center px-7 md:px-15 lg:w-[710px] mx-auto">
            Manage your hospital operations, patient records, and more with our
            powerful hospital management system.
          </p>
          <div className="flex gap-4 my-8 justify-center items-center">
            <Link className="btn bg-[#2465FF] text-white " to="/account/signup">
              New Patient
            </Link>
            <Link className="btn btn-outline text-[#2465FF] hover:bg-transparent" to="/account/signin">
              Login to Clinicare
            </Link>
          </div>
          <div className="container md:w-[867px] mx-auto px-4">
            <img
              className="rounded-xl"
              src="landing-page-img.png"
              alt="clinicare-dashboard"
            />
          </div>
        </div>
      </div>
      <div id="features" className="container mx-auto mt-10 py-5 px-4">
        <h1 className="font-bold text-[25px] md:text-[33px] text-center pb-3 text-[#130A5C]">
          Key Features to Simplify Hospital Management
        </h1>
        <p className="text-center mx-auto md:text-[20px] md:w-[700px] lg:w-[853px] pb-10">
          Comprehensive tools designed to enhance efficiency, improve patient
          care, and streamline hospital operations.
        </p>
        <div className="grid grid-cols-12 container gap-4 lg:gap-6">
          <div className="col-span-12 md:col-span-6 lg:col-span-4 border border-gray-500 rounded-lg p-[40px] h-[296px]">
            <img
              className="bg-[#D5E2FF] rounded-full p-3"
              src="formkit_datetime.svg"
              alt="formkit-icon"
            />
            <h1 className="font-semibold text-[22px] md:text-[23px] lg:text-[24px] mt-4">
              Appointment Scheduling
            </h1>
            <p className=" md:text-[17px] pt-3">
              Let patients book and reschedule appointments easily online with
              real-time availability and automated confirmations.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 border border-gray-500 rounded-lg p-[40px] h-[296px]">
            <img
              className="bg-[#FFD7FF] rounded-full p-3"
              src="iconoir_user-love.svg"
              alt="user-love-icon"
            />
            <h1 className="font-semibold text-[22px] md:text-[24px] mt-4 leading-tight">
              Doctor & Department Management
            </h1>
            <p className=" md:text-[17px] pt-3">
              Manage staff availability, departmental organization, and resource
              allocation efficiently.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 border border-gray-500 rounded-lg p-[40px] h-[296px]">
            <img
              className="bg-[#DDFFDD] rounded-full p-3"
              src="hugeicons_analytics-up.svg"
              alt="analytics-icon"
            />
            <h1 className="font-semibold text-[22px] md:text-[24px] mt-4">
              Analytics Dashboard
            </h1>
            <p className=" md:text-[17px] pt-3">
              Get real-time insights into bookings, patient visits, revenue, and
              operational performance.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 border border-gray-500 rounded-lg p-[40px] h-[296px]">
            <img
              className="bg-[#FFE2E2] rounded-full p-3"
              src="iconamoon_invoice-thin.svg"
              alt="invoice-icon"
            />
            <h1 className="font-semibold text-[22px] md:text-[24px] mt-4">
              Billing & Invoicing
            </h1>
            <p className=" md:text-[17px] pt-3">
              Generate invoices, track payments, and integrate with insurance
              providers seamlessly.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 border border-gray-500 rounded-lg p-[40px] h-[296px]">
            <img
              className="bg-[#FFEFD2] rounded-full p-3"
              src="hugeicons_analytics-up.svg"
              alt="analytic-icon"
            />
            <h1 className="font-semibold text-[22px] md:text-[24px] mt-4">
              Automated Reminders
            </h1>
            <p className=" md:text-[17px] pt-3">
              Send SMS and email alerts for appointments, follow-ups, and
              medication reminders automatically.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 border border-gray-500 rounded-lg p-[40px] h-[296px]">
            <img
              className="bg-[#EBD7FF] rounded-full p-3"
              src="pepicons-pencil_file.svg"
              alt="pepicons-icon"
            />
            <h1 className="font-semibold text-[22px] md:text-[24px] mt-4 leading-tight">
              Electronic Medical Records
            </h1>
            <p className=" md:text-[17px] pt-3">
              Store, access, and update patient records securely with
              comprehensive digital health documentation.
            </p>
          </div>
        </div>
      </div>
      <section id="howitworks" className="mx-auto container md:h-[1080px] relative my-15 px-4">
        <h1 className="font-bold  text-[30px] md:text-[36px] text-[#130A5C] text-center">
          How it works
        </h1>
        <p className="text-[18px] md:text-[22px] md:w-[650px] lg:w-[790px] mx-auto text-center">
          Simple steps to transform your hospital management and improve patient
          experience.
        </p>
        {/* Parent Div */}
        <div className="mt-12 md:mt-15">
          <div className="hidden lg:block absolute top- bottom- left-1/2 h-[58rem] w-px bg-gray-300 transform translate-x-1/2 z-0"/>
          {/* Part Div */}
          <div className="md:flex md:flex-row items-center justify-between">
            <div className="">
              <div className="flex items-center gap-[12px]">
                <h1 className="w-8 h-8 bg-[#1055F8] text-white text-center rounded-full p-1 md:p-1.5 font-semibold">
                  1
                </h1>
                <h1 className="text-[20px] md:text-[24px] font-semibold">
                  Sign Up and Set Up Your Hospital Profile
                </h1>
              </div>
              <p className="text-[17px] md:w-[531px] leading-tight pt-4">
                Add departments, doctors, rooms, and schedules to create a
                comprehensive hospital management system tailored to your
                facility.
              </p>
            </div>
            <div className="">
              <img
                className="h-[198.6px]"
                src="Frame 36.svg"
                alt="SignUp-icon"
              />
            </div>
          </div>
          <div className="md:flex md:flex-row-reverse items-center justify-between gap-[15px] mt-8">
            <div className="">
              <div className="flex items-center gap-[12px]">
                <h1 className="w-8 h-8 bg-[#1055F8] text-white text-center rounded-full p-1 md:p-1.5 font-semibold">
                  2
                </h1>
                <h1 className="text-[20px] md:text-[24px] font-semibold">
                  Enable Online Booking
                </h1>
              </div>
              <p className="text-[17px] md:w-[511px] leading-tight pt-4">
                Patients can view doctor availability and schedule appointments
                online through an intuitive booking interface available 24/7.
              </p>
            </div>
            <div className="">
              <img
                className="h-[198.6px]"
                src="Frame 37.svg"
                alt="Booking-icon"
              />
            </div>
          </div>
          <div className="md:flex items-center justify-between  my-8">
            <div className="">
              <div className="flex items-center gap-[12px]">
                <h1 className="w-8 h-8 bg-[#1055F8] text-white text-center rounded-full p-1 md:p-1.5 font-semibold">
                  3
                </h1>
                <h1 className="text-[20px] md:text-[24px] font-semibold">
                  Manage Appointments And Record
                </h1>
              </div>
              <p className="text-[17px] md:w-[531px] leading-tight pt-4">
                Hospital staff can efficiently manage patient queues, update
                medical records, and send automated reminders from a centralized
                dashboard.
              </p>
            </div>
            <div className="">
              <img
                className="h-[198.6px]"
                src="Frame 38.svg"
                alt="Appointment-icon"
              />
            </div>
          </div>
          <div className="md:flex md:flex-row-reverse items-center justify-between gap-[15px] ">
            <div className="">
              <div className="flex items-center gap-[12px]">
                <h1 className="w-8 h-8 bg-[#1055F8] text-white text-center rounded-full p-1 md:p-1.5 font-semibold">
                  4
                </h1>
                <h1 className="text-[20px] md:text-[24px] font-semibold">
                  Track Everything In One Dashboard
                </h1>
              </div>
              <p className="text-[17px] md:w-[511px] leading-tight pt-4">
                View comprehensive analytics including appointments, patient
                data, revenue metrics, and performance insights to optimize
                hospital operations.
              </p>
            </div>
            <div className="">
              <img
                className="h-[198.6px]"
                src="Frame 35.svg"
                alt="Tracking-icon"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col md:flex-row items-center font-semibold justify-center md:h-[170px] gap-10 md:gap-35 lg:gap-52 bg-[#044FFE] text-white py-8 md:px-10 lg:px-0 mx-auto">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="">100+</h1>
          <p>Hospitals</p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h1 className="">1M+</h1>
          <p>Patients Served</p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h1 className="">1000+</h1>
          Healthcare Professionals
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h1 className="">99.9%</h1>
          <p>System Uptime</p>
        </div>
      </div>
      <Link to="/contact">
      <RiDiscussFill size={44} className="md:hidden fixed font-bold bottom-5 right-5 bg-blue-500 text-white p-2.5 rounded-full"/>
      </Link>
      <div className="container mx-auto h-50"></div>
    </main>
  );
}
