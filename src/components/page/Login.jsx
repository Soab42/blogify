import React from "react";
import FormInput from "../common/FormInput";
import LoginForm from "../auth/LoginForm";
import LoginImage from "../auth/LoginImage";
import RotatingSquire from "../common/RotatingSquire";
<title>Login | Learn with Sumit</title>;

export default function Login() {
  return (
    <section className="container flex-center relative my-4 h-[77vh]">
      {/* <!-- Login Form into a box center of the page --> */}

      {/* <RotatingSquire /> */}
      <LoginImage />

      <div className="mx-auto my-0 h-full xl:w-1/2  bg-[#030317]/10 backdrop-blur-md p-8 rounded-md  z-10  flex-center-col">
        <h2 className="text-2xl font-bold mb-6 text-center ">Login</h2>
        <LoginForm />
      </div>
    </section>
  );
}
