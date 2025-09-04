import { getAllPatients } from "@/api/patients";
import ErrorAlert from "@/components/ErrorAlertPg";
import { SkeletonTable } from "@/components/LazyLoader";
import PageWrapper from "@/components/PageWrapper";
import Paginate from "@/components/Paginate";
import Search from "@/components/Search";
import Filter from "@/features/patients/Filter";
import useMetaArgs from "@/hooks/useMeta";
import usePaginate from "@/hooks/usePaginate";
import { useAuth } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React, { lazy, Suspense } from "react";
import { useSearchParams } from "react-router";

const Table = lazy(() => import("@/features/patients/Table"));

export default function Patients() {
  useMetaArgs({
    title: "Patients - Clinicare",
    description: "Clinicare account - Patients",
    keywords: "Clinicare, Users, patients",
  });

  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const query = searchParams.get("query") || "";
  const gender = searchParams.get("gender") || "";
  const bloodGroup = searchParams.get("bloodGroup") || "";
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllPatients", page, limit, query, gender, bloodGroup],
    queryFn: () => getAllPatients(searchParams, accessToken),
  });

  const patients = data?.data?.data?.patients || [];

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
        <h1 className="font-bold text-2xl">Patients</h1>
        <p className="text-gray-500 text-[14px] md:text-[16px]">
          Manage your patients
        </p>
      </div>
      <div className="flex mb-5 justify-end items-center">
        <Search id="search-patients">
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
                <Table patients={patients} />
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
