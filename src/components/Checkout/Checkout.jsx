import React from "react";
import { useCart } from "../../hooks/useCart";
import { useFormik } from "formik";
import FloatingInput from "../UI/FloatingInput/FloatingInput";
// import style from "./Checkout.module.css";
import * as Yup from "yup";
import {
  createCashOrder,
  createVisaOrder,
} from "../../services/checkoutService";
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, "Phone nust be egyptian number")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  addressLine1: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  landmark: Yup.string().required("Landmark is required"),
  paymentMethod: Yup.string().required("Choose a payment method"),
});
export default function Checkout() {
  const { cart } = useCart();

  const handleSubmit = async (values) => {
    const shippingAddress = {
      details: `${values.firstName} ${values.lastName},${values.email},${values.addressLine1}, ${values.landMark}, ${values.city}, ${values.state}, ${values.postalCode}`,
      phone: values.phone,
      city: values.city,
    };
    if (values.paymentMethod == "visa") {
      let data = await createVisaOrder(cart.cartId, shippingAddress);
      location.href = data.session.url;
    } else if (values.paymentMethod == "cash") {
      await createCashOrder(cart.cartId, shippingAddress);
    }
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      addressLine1: "",
      city: "",
      state: "",
      landmark: "",
      postalCode: "",
      paymentMethod: "",
    },
    onSubmit: handleSubmit,
    validationSchema,
  });
  return (
    <>
      <div className="container flex flex-col lg:flex-row w-full gap-5">
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-bold font-title mb-3">
            Order Summary
          </h1>
          {cart?.data?.products?.map((product) => (
            <div
              key={product._id}
              className="flex gap-2 items-cente p-2 shadow-md rounded-md"
            >
              <img
                src={product.product.imageCover}
                alt={product.product.name}
                className="w-24"
              />
              <div className="flex flex-col justify-betweenw-full justify-between ">
                <h2 className="mb-2 font-bold">{product.product.title}</h2>
                <p className="flex justify-between">
                  <span>Quantity</span>
                  <span>{product.count}</span>
                </p>
                <p className="flex justify-between m-0">
                  <span>Price Per Item</span>
                  <span>{product.price} EGP</span>
                </p>
                <p className="flex justify-between m-0">
                  <span>Total Price</span>
                  <span>{product.price * product.count} EGP</span>
                </p>
              </div>
            </div>
          ))}
          <div>
            <p className=" p-2 rounded-md shadow-md my-5 !font-bold ">
              Total Price: {cart?.data?.totalCartPrice} EGP
            </p>
          </div>
        </div>
        <div className="flex-2 ">
          <h1 className="text-2xl md:text-4xl font-bold font-title mb-3">
            Billing address
          </h1>
          <form onSubmit={formik.handleSubmit} className="md:w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <FloatingInput
                id={"firstName"}
                label={"First Name"}
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                error={
                  formik.errors.firstName &&
                  formik.touched.firstName &&
                  formik.errors.firstName
                }
                name="firstName"
              />
              <FloatingInput
                id={"lastName"}
                label={"Last name"}
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                error={
                  formik.errors.lastName &&
                  formik.touched.lastName &&
                  formik.errors.lastName
                }
                name="lastName"
              />
              <FloatingInput
                id={"phone"}
                label={"Phone"}
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
              <FloatingInput
                id={"email"}
                label={"Email"}
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
            </div>
            <div className="mb-5">
              <h2 className="!text-xl md:text-4xl font-bold font-title mb-3">
                Shipping Address
              </h2>
              <div>
                <FloatingInput
                  id={"addressLine1"}
                  label={"Address Line 1"}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.addressLine1}
                  error={
                    formik.errors.addressLine1 &&
                    formik.touched.addressLine1 &&
                    formik.errors.addressLine1
                  }
                  name="addressLine1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FloatingInput
                  id={"city"}
                  label={"City"}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  error={
                    formik.errors.city &&
                    formik.touched.city &&
                    formik.errors.city
                  }
                  name="city"
                />
                <FloatingInput
                  id={"state"}
                  label={"State"}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  error={
                    formik.errors.state &&
                    formik.touched.state &&
                    formik.errors.state
                  }
                  name="state"
                />
                <FloatingInput
                  id={"landmark"}
                  label={"LandMark"}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.landmark}
                  error={
                    formik.errors.landmark &&
                    formik.touched.landmark &&
                    formik.errors.landmark
                  }
                  name="landmark"
                />
                <FloatingInput
                  id={"postalCode"}
                  label={"Postal code"}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.postalCode}
                  error={
                    formik.errors.postalCode &&
                    formik.touched.postalCode &&
                    formik.errors.postalCode
                  }
                  name="postalCode"
                />
              </div>
            </div>
            {/* cash on delivery or credit card */}
            <div className="mb-5">
              <h2 className="!text-xl md:text-4xl font-bold font-title mb-3">
                Payment Method
              </h2>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="cash"
                  value="cash"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.paymentMethod === "cash"}
                />
                <label htmlFor="cash">Cash on Delivery</label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="visa"
                  value="visa"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  checked={formik.values.paymentMethod === "visa"}
                />
                <label htmlFor="visa">Visa</label>
              </div>
            </div>
            <div className="flex gap-5">
              <button
                type="submit"
                disabled={!formik.isValid}
                className="btn-primary w-full"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
