import { getAllUsers } from "@/api/auth";
import ErrorAlert from "@/components/ErrorAlert";
import { SkeletonCard } from "@/components/LazyLoader";
import PageWrapper from "@/components/PageWrapper";
import Paginate from "@/components/Paginate";
import Search from "@/components/Search";
import AddNewUser from "@/features/users/AddNewUser";
import Filter from "@/features/users/Filter";
import useMetaArgs from "@/hooks/useMeta";
// import UsersCard from "@/features/users/UsersCard";
import usePaginate from "@/hooks/usePaginate";
import { useAuth } from "@/store";
// import { dummyData } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import React, { lazy, Suspense } from "react";
import { useSearchParams } from "react-router";
const UsersCard = lazy(() => import("@/features/users/UsersCard"));

export default function Users() {
    useMetaArgs({
      title: "Users - Clinicare",
      description: "Clinicare account - Users",
      keywords: "Clinicare, manage-users, users",
    });

  const { accessToken } = useAuth();
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const query = searchParams.get("query") || "";
  const role = searchParams.get("role") || "";
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getAllUsers", page, limit, query, role],
    queryFn: () => getAllUsers(searchParams, accessToken),
  });

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

  const users = data?.data?.data?.users || [];

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
      <div className="flex mb-5 justify-end items-center">
        <Search id="search-users">
          <Filter />
        </Search>
      </div>
      {isPending ? (
        <SkeletonCard />
      ) : (
        <>
          {isError ? (
            <ErrorAlert error={error?.response?.data?.message} />
          ) : (
            <>
              {users?.length > 0 ? (
                <>
                  <Suspense fallback={<SkeletonCard />}>
                    <div className="mt-5 grid gap-3 grid-cols-12">
                      {users.map((item) => (
                        <div
                          key={item.id}
                          className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
                        >
                          <UsersCard item={item} />
                        </div>
                      ))}
                    </div>
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
                <p className="mt-8 font-semibold text-center">No Users found</p>
              )}
            </>
          )}
        </>
      )}
    </PageWrapper>
  );
}
