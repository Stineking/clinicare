import { validateSignUpSchema } from "@/utils/dataSchema";
import { RiUser4Fill } from "@remixicon/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useMetaArgs from "@/hooks/useMeta";
import { registerUser } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import ErrorAlert from "@/components/ErrorAlert";
import { useAuth } from "@/store";

//use mutation to handle form submission
export default function SignUp() {
  useMetaArgs({
    title: "Sign Up - Clinicare",
    description: "Create an account on Clinicare",
    keywords: "Clinicare, create account, setup, sign-up, account",
  });
  const { setAccessToken, user } = useAuth();

  
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  
  const [isVisible, setIsVisible] = useState(false);
  const togglePassword = () => {
    setIsVisible((prev) => !prev);
  };


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(validateSignUpSchema) });

  // const queryClient = useQueryClient(); //initializing query client from tanstack
  //mutation are for create, update or delete actions.
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (response) => {
      //what you want to do if api call is a success.
      toast.success(response?.data?.message || "Registeration successful");
      setAccessToken(response?.data?.data?.accessToken);
      //save access token tolocal storage
       if (!user?.isVerified) {
        navigate("/verify-account")
      } 
    },
    onError: (error) => {
      import.meta.env.DEV && console.log(error);
      setError(error?.response?.data?.message || "Registeration failed");
    },
  });

  const onSubmit = async (data) => {
    mutation.mutate(data); //submitting our form to our mutattion function to help us make the api call using registerUser api.
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] container mx-auto flex justify-center pt-10 items-center">
      <div className="px-4 md:px-0 md:mb-5">
        <form
          className="bg-white px-5 py-3 w-[360px] flex flex-col justify-center rounded-xl shadow max-w-[400px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <RiUser4Fill
            className="mx-auto border rounded-full p-2 border-blue-500 text-blue-500 shadow-lg"
            size={40}
          />
          <h1 className="font-bold text-2xl text-center py-2">
            Create Account
          </h1>
          <p className="text-center text-[16px] md:text-[15px] text-zinc-600">
            Enter your details to sign up
          </p>
          {error && <ErrorAlert error={error} />}
          <div>
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
          <div>
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

          <div>
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
                className="absolute font-semibold cursor-pointer top-1 left-66 inset-0"
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
          <div>
            <button
              type="submit"
              disabled={isSubmitting || mutation.isPending}
              className="bg-blue-500 hover:bg-blue-600 w-full cursor-pointer py-2 text-white text-[14px] font-bold rounded-sm my-4"
            >
              {isSubmitting || mutation.isPending ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
          <p className="text-center text-[13px] text-zinc-600">
            Already have an account?{" "}
            <Link className="text-blue-500 font-bold" to="/account/signin">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
