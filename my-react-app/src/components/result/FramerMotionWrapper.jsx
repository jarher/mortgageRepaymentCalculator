/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

export const FramerMotionWrapper = ({ props, children }) => {
  return <motion.div {...props}>{children}</motion.div>;
};
