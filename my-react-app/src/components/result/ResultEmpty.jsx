/* eslint-disable react/no-unescaped-entities */
import IconEmpty from "../../assets/images/illustration-empty.svg";
import { motion } from "framer-motion";

export const ResultEmpty = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-100 d-flex align-items-center justify-content-center"
    >
      <div className="text-center">
        <img src={IconEmpty} alt="illustration empty icon" />
        <span className="result-empty__title d-block">Results shown here</span>
        <p className="result-empty__paragraph  mt-3">
          Complete the form and click "calculated repayments" to see what your
          monthly repayments would be
        </p>
      </div>
    </motion.div>
  );
};
