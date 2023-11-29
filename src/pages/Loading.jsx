import React from "react";
import { motion } from "framer-motion";

export const Loading = () => {
  return (
    <motion.div className="absolute top-0 bg-white w-screen h-screen z-50">
      <div className="flex flex-row justify-center items-center h-screen">
        <motion.span
          className="block mx-1 w-2 h-2 bg-indigo-600 rounded-md"
          initial={{ y: 0 }}
          animate={{ y: 15 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.span
          className="block w-2 mx-1 h-2 bg-indigo-600 rounded-md"
          initial={{ y: 0 }}
          animate={{ y: 15 }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.span
          className="block w-2 mx-1 h-2 bg-indigo-600 rounded-md"
          initial={{ y: 0 }}
          animate={{ y: 15 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </motion.div>
  );
};
