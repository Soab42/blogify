import React from "react";
import LoginSvg from "../../assets/Mobileloginbro.svg";
import { motion } from "framer-motion";

export default function LoginImage() {
  return (
    <motion.div
      className="w-1/2"
      initial={{ opacity: 0.5, x: -20 }} // Initial state (before entering viewport)
      animate={{
        opacity: 1,
        x: [200, 0],
        transition: { duration: 0.3, ease: "easeInOut" },
      }} // Animation when entering viewport
    >
      <img
        src={LoginSvg}
        className="xl:w-full object-fill"
        width={800}
        height={800}
      />
    </motion.div>
  );
}
