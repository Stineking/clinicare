import ErrorAlert from "@/components/errorAlert";
import Modal from "@/components/Modal";
import { validateSignUpSchema } from "@/utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddNewUser() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validateSignUpSchema) });

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };
  const role = ["admin", "staff", "doctor", "nurse", "patient"];

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <button
        className="btn bg-blue-500 hover:bg-blue-600 text-white w-35 rounded-md cursor-pointer border border-gray-300"
        onClick={() => setIsOpen(true)}
      >
        Add New User
      </button>
      <Modal
        id="addUserModal"
        isOpen={isOpen}
        className="bg-white p-4 rounded-xl shadow w-[90%] max-w-[400px] mx-auto"
      >
        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-2xl font-bold">Create User</h1>
          <p className=""></p>
          <form
            className="grid grid-cols-12 gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            {error && <ErrorAlert error={error} />}
            <div className="col-span-12 md:col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Full name</legend>
                <input
                  type="text"
                  className="input"
                  placeholder="Full name"
                  {...register("fullname")}
                />
              </fieldset>
              {errors.fullname?.message && (
                <span className="text-xs text-red-500">
                  {errors.fullname?.message}
                </span>
              )}
            </div>

            <div className="col-span-12 md:col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Email</legend>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  {...register("email")}
                />
              </fieldset>
              {errors.email?.message && (
                <span className="text-xs text-red-500">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="col-span-12 md:col-span-6">
              <fieldset className="fieldset relative">
                <legend className="fieldset-legend">Password</legend>
                <input
                  type={isVisible ? "text" : "password"}
                  className="input"
                  placeholder="Password"
                  {...register("password")}
                />
                <button
                  type="button"
                  className="absolute font-semibold cursor-pointer top-1 left-66 md:left-43 inset-0"
                  onClick={togglePassword}
                >
                  {isVisible ? "Hide" : "Show"}
                </button>
              </fieldset>
              {errors.password?.message && (
                <span className="text-xs text-red-500">
                  {errors.password?.message}
                </span>
              )}
            </div>
            <div className="col-span-12 md:col-span-6">
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Role</legend>
                <select
                  name="role"
                  id=""
                  defaultValue={""}
                  className="select capitalize"
                  {...register("role")}
                  disabled={isSubmitting}
                >
                  <option value="">Select Role</option>
                  {role?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </fieldset>
              {errors.gender?.message && (
                <span className="text-xs text-red-500">
                  {errors.gender?.message}
                </span>
              )}
            </div>
            <div className="mt-4 mb-2 flex md:ml-38 md:justify-right gap-3">
              <button
                type="button"
                className="btn btn-outline w-[150px] border-[0.2px] border-gray-500"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-blue-500 hover:bg-blue-600 text-white w-[150px]"
                disabled={isSubmitting}
                // onClick={onDelete}
              >
                {isSubmitting ? "Adding..." : "Add User"}
                {/* {mutation.isPending ? "Adding..." : "Add User"} */}
                {/* Add User */}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
