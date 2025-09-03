import { getAllRooms } from "@/api/room";
import PageWrapper from "@/components/PageWrapper";
import Search from "@/components/Search";
import Filter from "@/features/rooms/Filter";
import AddRoom from "@/features/rooms/AddRoom";
import { useAuth } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { useSearchParams } from "react-router";
import usePaginate from "@/hooks/usePaginate";
import { SkeletonTable } from "@/components/LazyLoader";
import Table from "@/features/rooms/Table";
import Paginate from "@/components/Paginate";
import useMetaArgs from "@/hooks/useMeta";
import ErrorAlert from "@/components/ErrorAlert";

export default function Rooms() {
  useMetaArgs({
    title: "Rooms - Clinicare",
    description: "Clinicare account - Rooms",
    keywords: "Clinicare, management, rooms",
  });
// next
  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const query = searchParams.get("query") || "";
  const roomType = searchParams.get("roomType") || "";
  const roomStatus = searchParams.get("roomStatus") || "";
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllRooms", page, limit, query, roomType, roomStatus],
    queryFn: () => getAllRooms(searchParams, accessToken),
  });

  const rooms = data?.data?.data?.rooms || [];

  const {
    handlePageChange,
    totalPages,
    hasMore,
    currentPage,
    // limit: pageLimit,
  } = usePaginate({
    totalPages: data?.data?.data?.meta?.totalPages || 1,
    hasMore: data?.data?.data?.meta?.hasMore || false,
    currentPage: data?.data?.data?.meta?.currentPage || 1,
  });
  return (
    <PageWrapper>
      <div className="flex justify-between items-center pb-2">
        <div>
          <h1 className="font-bold text-2xl">Rooms</h1>
          <p className="text-gray-500 text-[14px] md:text-[16px]">
            Manage your Rooms booking here.
          </p>
        </div>
        <AddRoom />
      </div>
      <div className="flex mb-5 justify-end items-center">
        <Search id="search-rooms">
          <Filter />
        </Search>
      </div>
      {isPending ? (
        <SkeletonTable />
      ) : (
        <>
          {isError ? (
            <ErrorAlert error={error?.response?.data?.message} />
          ) : (
            <>
              <Suspense fallback={<SkeletonTable />}>
                <Table rooms={rooms} />
              </Suspense>
              <Paginate
                totalPages={totalPages}
                hasMore={hasMore}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
                // limit={pageLimit}
              />
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
}
