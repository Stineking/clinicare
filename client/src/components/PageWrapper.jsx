import React from "react";

export default function PageWrapper({ children, classname }) {
  return (
    <div
      className={`container pt-17 md:pt-20 lg:pt-10 pb-6 md:px-1 lg:px-4 mx-auto ${classname}`}
    >
      {children}
    </div>
  );
}
