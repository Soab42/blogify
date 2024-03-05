import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import FormInput from "../common/FormInput";
export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log("data", data);
    setError("root.serverError", {
      type: "400",
      message: "server error",
    });
    setError("root.random", {
      type: "random",
      message: "random error",
    });
  };
  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0.5, x: -20 }} // Initial state (before entering viewport)
      animate={{
        opacity: 1,
        x: [200, 0],
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      autoComplete="off"
      className="w-full"
    >
      <div className="mb-6">
        <FormInput label={"First Name *"} error={errors.firstName}>
          <input
            {...register("firstName", { required: "First Name is required" })}
            type="text"
            id="firstName"
            name="firstName"
            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </FormInput>
      </div>
      <div className="mb-6">
        <FormInput label={"Last Name"} error={errors.lastName}>
          <input
            {...register("lastName", { required: "Last Name is required" })}
            type="text"
            id="lastName"
            name="lastName"
            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </FormInput>
      </div>
      <div className="mb-6">
        <FormInput label={"Email"} error={errors.email}>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            id="email"
            name="email"
            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </FormInput>
      </div>
      <div className="mb-6">
        <FormInput label={"Password"} error={errors.password}>
          <input
            {...register("password", { required: "Password is Required" })}
            type="password"
            id="password"
            name="password"
            className="w-full p-3 bg-[#030317] border border-white/20 rounded-md focus:outline-none focus:border-indigo-500"
          />
        </FormInput>
      </div>
      <div className="mb-6 capitalize">
        {errors.root?.random?.message && (
          <p className="text-rose-600 mb-2 text-center w-full">
            {errors.root.random.message}
          </p>
        )}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Create Account
        </button>
      </div>
      <p className="text-center">
        Already have account?
        <Link to="/login" className="text-indigo-600 hover:underline px-2">
          Login
        </Link>
      </p>
    </motion.form>
  );
}
