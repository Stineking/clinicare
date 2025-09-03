import { useState } from "react";
import Modal from "./Modal";
import { RiLogoutCircleRLine } from "@remixicon/react";
import { useLocation, useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/api/auth";
import { toast } from "sonner";
import { useAuth } from "@/store";

export default function Logout() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const QueryClient = useQueryClient();
  const { accessToken, setAccessToken } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: (response) => {
      toast.success(response?.data?.message);
      QueryClient.clear();
      setIsOpen(false);
      setAccessToken(null);
      navigate("/account/signin");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message, { id: "logout" });
    },
  });

  const onLogout = async () => {
    // logout();
    mutation.mutate(accessToken);
    // localStorage.removeItem("refresh_token")
  };
  return (
    <>
      <button
        className={`${
          location.pathname === "/verify-account"
            ? "btn bg-red-500 hover:bg-red-600 text-white"
            : ""
        } p-4 flex gap-2 items-center text-base cursor-pointer text-red-500`}
        onClick={() => setIsOpen(true)}
      >
        <RiLogoutCircleRLine /> Logout
      </button>
      <Modal
        id="logoutModal"
        isOpen={isOpen}
        className="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto"
      >
        <div className="flex flex-col items-center gap-2 w-full">
          <RiLogoutCircleRLine size={40} className="text-red-500" />
          <h1 className="text-2xl font-bold">Logout</h1>
          <p className="text-center">
            Are you sure you want to logout from your account?
          </p>
          <div className="mt-4 mb-2 flex gap-3">
            <button
              type="button"
              className="btn btn-outline w-[150px] border-[0.2px] border-gray-500"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn bg-red-500 hover:bg-red-600 text-white w-[150px]"
              disabled={mutation.isPending}
              onClick={onLogout}
            >
              Yes, Logout
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
