import React from "react";
import FloatingInput from "../UI/FloatingInput/FloatingInput";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useFormik } from "formik";

import image from "../../assets/images/forgot-password.svg";
// import style from "./ForgotPassword.module.css";
export default function ForgotPassword() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["Forgot Password"],
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Code sent to your email");
      navigate("/verify-reset-code");
    },
    onError: (err) => {
      console.log("Failed Login :", err.response.data.message);
      toast.error(`${err.response.data.message}`);
    },
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: mutation.mutate,
  });
  return (
    <>
      <section className="w-full h-screen -mt-30 flex">
        <div className="w-full flex-items-center justify-center hidden md:block">
          <img
            src={image}
            alt="forgot password"
            className="h-full w-full bg-gray-100 p-20"
          />
        </div>
        <div className="w-full md:w-1/2 h-full py-30 px-4 flex flex-col justify-center">
          <h1 className="h1">ForgotPassword</h1>
          <form onSubmit={formik.handleSubmit}>
            <FloatingInput
              id={"email"}
              label={"email"}
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={
                formik.errors.email &&
                formik.touched.email &&
                formik.errors.email
              }
              name="email"
            />
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Loading..." : "Send Code"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
