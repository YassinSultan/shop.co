import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router";
import { verifyResetCode } from "../../services/authService";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import image from "../../assets/images/forgot-password.svg";
import FloatingInput from "../UI/FloatingInput/FloatingInput";
// import style from "./VerifyResetCode.m
// odule.css";
export default function VerifyResetCode() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["Verify Reset Code"],
    mutationFn: verifyResetCode,
    onSuccess: () => {
      navigate("/reset-password");
    },
    onError: (err) => {
      toast.error(`${err.response.data.message}`);
    },
  });
  const formik = useFormik({
    initialValues: {
      resetCode: "",
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
          <h1 className="h1">Verify Reset Code</h1>
          <form onSubmit={formik.handleSubmit}>
            <FloatingInput
              id={"resetCode"}
              label={"resetCode"}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.resetCode}
              error={
                formik.errors.resetCode &&
                formik.touched.resetCode &&
                formik.errors.resetCode
              }
              name="resetCode"
            />
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Loading..." : "Verify"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
