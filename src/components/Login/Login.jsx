// import style from "./Login.module.css";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import sideImage from "../../assets/images/Login.png";
import FloatingInput from "../UI/FloatingInput/FloatingInput";
import { useAuth } from "../../hooks/useAuth";
import { login } from "../../services/authService";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  const { saveToken } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["Login"],
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Login success:", data.data);
      saveToken(data.data.token);
      toast.success("Login Successful");
      navigate("/");
    },
    onError: (err) => {
      console.log("Failed Login :", err.response.data.message);
      toast.error(`${err.response.data.message}`);
    },
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: mutation.mutate,
  });

  return (
    <>
      <div className="container my-5">
        <div className="flex gap-10 items-center">
          <div className="w-1/2 hidden md:block">
            <img src={sideImage} alt="Login" className="w-full h-auto" />
          </div>
          <div className="flex-1">
            <h2 className="h2 !mb-10">Login</h2>
            {/* form */}
            <form onSubmit={formik.handleSubmit} className="md:w-full mx-auto">
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
              <button
                type="submit"
                className="btn-primary disabled:opacity-50 w-full"
                disabled={!formik.dirty || !formik.isValid}
                // loading
              >
                {mutation.isPending ? "Loading..." : "Login"}
              </button>
            </form>
            <hr className="my-3 border-gray-200" />
            <p className="text-center">
              Don't have an account?
              <Link to={"/register"} className="text-secondary-2 px-2">
                Register an new account
              </Link>
            </p>
            {/* forgot password */}
            <p className="text-center">
              <Link
                to={"/forgot-password"}
                className="border-b-1 border-gray-500"
              >
                Forgot Password ?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
