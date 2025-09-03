import { deleteAccount } from "@/api/auth";
import ErrorAlert from "@/components/ErrorAlert";
import Modal from "@/components/Modal";
import { useAuth } from "@/store";
import { RiDeleteBinLine } from "@remixicon/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "sonner";

export default function DeleteAccount() {
  const { accessToken, setAccessToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: async (response) => {
      if (response.status === 200) {
        toast.success(response?.data?.message);
        //clears all cacched keys from tanstack query
        queryClient.clear();
        setAccessToken(null);
        // window.location.reload();
      }
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Error deleting your account");
    },
  });

  const onDelete = async () => {
    mutation.mutate(accessToken);
  };

  return (
    <>
      <button
        className="btn bg-red-500 hover:bg-red-600 text-white w-full md:w-45"
        onClick={() => setIsOpen(true)}
      >
        <RiDeleteBinLine /> Delete Account
      </button>
      <Modal
        id="deleteModal"
        isOpen={isOpen}
        className="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto"
      >
        <div className="flex flex-col items-center gap-2 w-full">
          <RiDeleteBinLine size={40} className="text-red-500" />
          <h1 className="text-2xl font-bold">Delete Account</h1>
          <p className="text-center">
            Are you sure you want to delete your account?
          </p>
          {error && <ErrorAlert error={error} />}
          <div className="mt-4 mb-2 flex gap-3">
            <button
              type="button"
              className="btn btn-outline w-[150px] border-[0.2px] border-gray-500"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-red-500 hover:bg-red-600 text-white w-[150px]"
              disabled={mutation.isPending}
              onClick={onDelete}
            >
              {mutation.isPending ? "Deleting..." : "Yes, Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
