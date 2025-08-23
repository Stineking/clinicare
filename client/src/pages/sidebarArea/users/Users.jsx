import PageWrapper from "@/components/PageWrapper";
import AddNewUser from "@/features/users/AddNewUser";
import UsersCard from "@/features/users/UsersCard";
import { data } from "@/utils/constants";
import { RiFilterLine, RiSearchLine } from "@remixicon/react";
import React from "react";

export default function Users() {
  
  return (
    <PageWrapper>
      <div className="flex justify-between items-center pb-2">
        <div className="">
          <h1 className="font-bold text-2xl">User Data</h1>
          <p className="text-gray-500 text-[14px] md:text-[16px]">
            Manage your list of users.
          </p>
        </div>
        <AddNewUser />
      </div>
      <div className="flex items-center md:justify-end mt-5">
        <div className="flex md:gap-4 relative">
          <RiSearchLine
            className="absolute inset-y-0 top-2 left-3  text-gray-500"
            size={22}
          />
          <input
            type="search"
            placeholder="Search"
            className="border border-gray-400 bg-white pl-10 pr-4 py-2 rounded text-sm"
          />
          <RiFilterLine
            size={38}
            className="border p-2 border-gray-500 bg-white/70"
          />
        </div>
      </div>
      <div className="mt-5 grid gap-3 grid-cols-12">
        {data.map((item) => (
          <div
            key={item.id}
            className="col-span-12 md:col-span-4 lg:col-span-3"
          >
            <UsersCard item={item} />
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
