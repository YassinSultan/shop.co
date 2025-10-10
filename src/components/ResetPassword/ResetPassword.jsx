import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router";
import { resetPassword } from "../../services/authService";
import { toast } from "react-toastify";
import { useFormik } from "formik";

import image from "../../assets/images/forgot-password.svg";
import FloatingInput from "../UI/FloatingInput/FloatingInput";
// import style from "./ResetPassword.module.css";

import * as Yup from "yup";
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  newPassword: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z1-9]/, "Password can only contain Latin letters.")
    .required("Required"),
});
export default function ResetPassword() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["reset password"],
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("password was reset successfully");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(`${err.response.data.message}`);
    },
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: mutation.mutate,
    validationSchema,
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
            <FloatingInput
              id={"newPassword"}
              label={"new Password"}
              type="newPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
              error={
                formik.errors.newPassword &&
                formik.touched.newPassword &&
                formik.errors.newPassword
              }
              name="newPassword"
            />
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Loading..." : "Reset Password"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
