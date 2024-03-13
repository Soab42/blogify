import React from "react";
import { motion } from "framer-motion";
import deadWomen from "../../assets/icons/elephent.png";
import Tree from "../../assets/icons/tree.png";
export default function PageNotFound() {
  const text = "404 | Page Not Found";
  return (
    <div className="h-[79vh] relative flex justify-center items-center flex-col overflow-hidden relative">
      <div className="font-thin  z-10 backdrop-blur-2xl  flex justify-between px-96 items-center h-screen">
        {/* {splitText.map((t) => (
          <motion.span
            className="duration-1000"
            // initial={{ rotate: 0 }}
            animate={{
              // rotateY: [],
              // scale: [1, 2, 1],
              // translateX: [Math.random() * 30, Math.random() * -30],
              translateY: [
                Math.random() * Math.random() * 200,
                Math.random() * -Math.random(0, -2) * 200,
              ],
            }}
            transition={{
              duration: 3,
              delay: 1,
              repeat: Infinity,
              repeatType: "loop",
              times: [1, 1, 1],
            }}
            key={t}
          >
            {t}
          </motion.span>
        ))} */}
        <motion.img
          // animate={{
          //   x: [Math.random() * 10000, Math.random(), Math.random() * -100],
          // }}
          transition={{ delay: 1, repeat: Infinity }}
          src={Tree}
          width={500}
          // className="animate-ping"
        />
        <div>
          <motion.img
            transition={{ delay: 1, repeat: Infinity }}
            src={deadWomen}
            // className="animate-ping"
          />
          <p className="absolute text-7xl top-[75%] ">404 | Page Not Found!</p>
        </div>
      </div>
      <motion.div
        className="absolute top-0 bg-gradient-to-br shadow-pink/10-400  from-yellow-300 via-red-400 via-40%  to-sky-500 text-center  shadow-2xl shadow-pink-400  size-[20rem] rounded-full z-0 "
        animate={{
          x: [100, -100], // Move from current position to 100 pixels right, then to -100 pixels left
          y: [300, 600], // Move from current position to 100 pixels down, then stay at the same position
          // borderRadius: [10, 80, 20], // Move from current position to 100 pixels right, then to -100 pixels left
          borderTopLeftRadius: [100, 800], // Move
          borderTopRightRadius: [10, 80, 200, 200], // Move
          borderBottomRightRadius: [100, 500], // Move
          borderBottomLeftRadius: [300], // Move
          scale: [0, 2, 0, 2],
          opacity: [1, 0, 1, 0],
        }}
        transition={{
          // delay: 1,
          duration: 7,
          times: [0, 3, 2, 1],
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>
      <motion.div
        className="absolute top-0 bg-gradient-to-br shadow-pink/10-400  from-emerald-400 via-green-400 via-80%  to-sky-500 text-center  shadow-2xl shadow-pink-400  size-[10rem] rounded-full z-0 "
        animate={{
          x: [-200, 100], // Move from current position to 100 pixels right, then to -100 pixels left
          y: [0, 100], // Move from current position to 100 pixels down, then stay at the same position
          // borderRadius: [10, 80, 20], // Move from current position to 100 pixels right, then to -100 pixels left
          borderTopLeftRadius: [100, 100], // Move
          borderTopRightRadius: [10, 400, 0, 200], // Move
          borderBottomRightRadius: [100, 900], // Move
          borderBottomLeftRadius: [300, 900], // Move
          scale: [1, 2, 0, 1],
          opacity: [1, 1, 0, 1],
        }}
        transition={{
          // delay: 1,
          duration: 7,
          times: [0, 3, 2, 1],
          repeat: Infinity,
          repeatType: "reverse",
        }}
      ></motion.div>
    </div>
  );
}
