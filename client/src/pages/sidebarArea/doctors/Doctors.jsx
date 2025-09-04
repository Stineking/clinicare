import { getAllDoctors } from "@/api/doctor";
import ErrorAlert from "@/components/ErrorAlert";
import { SkeletonTable } from "@/components/LazyLoader";
import PageWrapper from "@/components/PageWrapper";
import Paginate from "@/components/Paginate";
import Search from "@/components/Search";
import Filter from "@/features/doctors/Filter";
import Table from "@/features/doctors/Table";
import useMetaArgs from "@/hooks/useMeta";
import usePaginate from "@/hooks/usePaginate";
import { useAuth } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { useSearchParams } from "react-router";
//ll

export default function Doctors() {
  useMetaArgs({
    title: "Doctors - Clinicare",
    description: "Clinicare account - Doctors",
    keywords: "Clinicare, medical, doctors",
  });

  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const query = searchParams.get("query") || "";
  const specialization = searchParams.get("specialization") || "";
  const availability = searchParams.get("availability") || "";
  const { isPending, isError, data, error } = useQuery({
    queryKey: [
      "getAllDoctors",
      page,
      limit,
      query,
      specialization,
      availability,
    ],
    queryFn: () => getAllDoctors(searchParams, accessToken),
  });

  const doctors = data?.data?.data?.doctors || [];

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
        <div className="">
          <h1 className="font-bold text-2xl">Doctors</h1>
          <p className="text-gray-500 text-[14px] md:text-[16px]">
            Manage your doctors.
          </p>
        </div>
      </div>
      <div className="flex mb-5 justify-end items-center">
        <Search id="search-doctors">
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
                <Table doctors={doctors} />
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
