import React from "react";
// import style from "./Register.module.css";
import sideImage from "../../assets/images/sign-up.png";
import FloatingInput from "../UI/FloatingInput/FloatingInput";

import { useFormik } from "formik";
import * as Yup from "yup";
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z1-9]/, "Password can only contain Latin letters.")
    .required("Required"),
  rePassword: Yup.string()
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z1-9]/, "Password can only contain Latin letters.")
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  phone: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, "Phone nust be egyptian number")
    .required("Required"),
});
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { register } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";
export default function Register() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: () => {
      toast.success("Register Successful");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(`${err.response.data.message}`);
    },
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: SignupSchema,
    onSubmit: mutation.mutate,
  });

  return (
    <>
      <div className="container my-5">
        <div className="flex gap-10 items-center">
          <div className="w-1/2 hidden md:block">
            <img src={sideImage} alt="Register" className="w-full h-auto" />
          </div>
          <div className="flex-1">
            <h2 className="h2 !mb-10">Sign Up</h2>
            {/* form */}
            <form onSubmit={formik.handleSubmit} className="md:w-full mx-auto">
              <FloatingInput
                id={"name"}
                label={"name"}
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                name="name"
                error={
                  formik.errors.name &&
                  formik.touched.name &&
                  formik.errors.name
                }
              />
              <FloatingInput
                id={"email"}
                label={"email"}
                type="text"
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
                id={"password"}
                label={"password"}
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={
                  formik.errors.password &&
                  formik.touched.password &&
                  formik.errors.password
                }
                name="password"
              />
              <FloatingInput
                id={"rePassword"}
                label={"re-enter password"}
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
                error={
                  formik.errors.rePassword &&
                  formik.touched.rePassword &&
                  formik.errors.rePassword
                }
                name="rePassword"
              />
              <FloatingInput
                id={"phone"}
                label={"phone"}
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                error={
                  formik.errors.phone &&
                  formik.touched.phone &&
                  formik.errors.phone
                }
                name="phone"
              />

              <button
                type="submit"
                className="btn-primary disabled:opacity-50 w-full"
                disabled={!formik.dirty || !formik.isValid}
                // loading
              >
                {mutation.isPending ? "Loading..." : "Register"}
              </button>
            </form>
            <hr className="my-3 border-gray-200" />
            <p className="text-center">
              Already have an account?
              <Link to={"/login"} className="text-secondary-2 px-2">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
