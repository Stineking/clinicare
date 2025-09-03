import { getPatientsAppointment } from "@/api/appointment";
import ErrorAlert from "@/components/errorAlert";
import { SkeletonTable } from "@/components/LazyLoader";
import PageWrapper from "@/components/PageWrapper";
import Paginate from "@/components/Paginate";
import Search from "@/components/Search";
import BookAppointment from "@/features/appointments/patients/BookAppointment";
import Filter from "@/features/appointments/patients/Filter";
import Table from "@/features/appointments/patients/Table";
import useMetaArgs from "@/hooks/useMeta";
import usePaginate from "@/hooks/usePaginate";
import { useAuth } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { useSearchParams } from "react-router";

export default function PatientAppointments() {
    useMetaArgs({
      title: "Patient Appointments - Clinicare",
      description: "Clinicare account - Patient Appointments",
      keywords: "Clinicare, patients, appointments",
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
      "getPatientsAppointment",
      page,
      limit,
      query,
      status,
      time,
      startDate,
      endDate,
    ],
    queryFn: () => getPatientsAppointment(searchParams, accessToken),
  });

  const patientsAppointment = data?.data?.data?.appointments || [];
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
          <h1 className="font-bold text-2xl">Appointments</h1>
          <p className="text-gray-500 text-[14px] md:text-[16px]">
            Manage your appointments.
          </p>
        </div>
        <BookAppointment />
      </div>
      <div className="flex mb-5 justify-end items-center">
        <Search id="search-patients-appointments">
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
              {patientsAppointment?.length > 0 ? (
                <>
                  <Suspense fallback={<SkeletonTable />}>
                    <Table patientsAppointment={patientsAppointment} />
                  </Suspense>
                  <Paginate
                    totalPages={totalPages}
                    hasMore={hasMore}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    // limit={pageLimit}
                  />
                </>
              ) : (
                <p className="mt-6  font-semibold text-center">
                  No appointments found
                </p>
              )}
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
}
