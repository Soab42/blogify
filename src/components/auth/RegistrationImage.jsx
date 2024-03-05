import React from "react";
import { motion } from "framer-motion";
import LoginSvg from "../../assets/Signup-bro.svg";

export default function RegistrationImage() {
  return (
    <motion.div
      className="xl:min-w-[46rem] w-1/2"
      initial={{ opacity: 0.5, x: -20 }} // Initial state (before entering viewport)
      animate={{
        opacity: 1,
        x: [-200, 0],
        transition: { duration: 0.3, ease: "easeInOut" },
      }} // Animation when entering viewport
    >
      <img
        src={LoginSvg}
        className="w-full object-fill"
        width={800}
        height={800}
      />
    </motion.div>
  );
}
