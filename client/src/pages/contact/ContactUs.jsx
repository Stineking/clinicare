import useMetaArgs from "@/hooks/useMeta";
import React from "react";

export default function ContactUs() {
  useMetaArgs({
      title: "Contact Us - Clinicare",
      description: "Contact us page.",
      keywords: "Clinicare, contact-us, hospital information",
    });
  return (
    <div className="flex flex-col justify-center items-center mx-auto container min-h-[calc(100vh-4rem)]">
      <div >
        <img
          className="h-[90%] w-full"
          src="Contact-us.svg"
          alt="contact-us img"
        />
      </div>
      <div className=" flex flex-col items-center">
        <h1 className="font-bold text-3xl pt-5">Contact Us</h1>
        <a href="mailto:clinicare@gmail.com" className="py-2">
          Email: clinicare@gmail.com
        </a>
        <a href="tel:+234123456789l">Phone: +234 123 456 789</a>
      </div>
    </div>
  );
}
