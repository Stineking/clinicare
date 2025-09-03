import { getAllAppointments } from "@/api/appointment";
import { SkeletonTable } from "@/components/LazyLoader";
import PageWrapper from "@/components/PageWrapper";
import Paginate from "@/components/Paginate";
import Search from "@/components/Search";
import Table from "@/features/appointments/admin/Table";
import Filter from "@/features/appointments/patients/Filter";
import useMetaArgs from "@/hooks/useMeta";
import usePaginate from "@/hooks/usePaginate";
import { useAuth } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import ErrorAlert from "@/components/ErrorAlert";
import { useSearchParams } from "react-router";

export default function Appointments() {
  useMetaArgs({
    title: "Appointments - Clinicare",
    description: "Clinicare account - Appointments",
    keywords: "Clinicare, Admin, Manage-Appointments, Appointments",
  });

  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const query = searchParams.get("query") || "";
  const status = searchParams.get("status") || "";
  const time = searchParams.get("time") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const { isPending, isError, data, error } = useQuery({
    queryKey: [
      "getAllApointments",
      page,
      limit,
      query,
      status,
      time,
      startDate,
      endDate,
    ],
    queryFn: () => getAllAppointments(searchParams, accessToken),
  });

  const appointment = data?.data?.data?.appointments || [];
  console.log("apps:", appointment);
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
      <div className="pb-2">
        <h1 className="font-bold text-2xl">Appointments</h1>
        <p className="text-gray-500 text-[14px] md:text-[16px]">
          Manage patients appointments.
        </p>
      </div>
      <div className="flex mb-5 justify-end items-center">
        <Search id="search-appointments">
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
                <Table appointment={appointment} />
              </Suspense>
              <Paginate
                totalPages={totalPages}
                hasMore={hasMore}
                handlePageChange={handlePageChange}
                currentPage={currentPage}
              />
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
}
