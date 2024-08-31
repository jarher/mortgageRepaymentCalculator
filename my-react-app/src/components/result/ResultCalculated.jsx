/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useFormContext } from "../../context/appContext";
import { motion } from "framer-motion";

const monthlyRepayments = (loanAmount, mortgageTerm, interestRate) => {
  const numberOfPayments = mortgageTerm * 12;
  const yearlyInterestRate = interestRate / 100;
  const resultPower = Math.pow(
    (12 + yearlyInterestRate) / 12,
    numberOfPayments
  );

  // const interestRepayment = (interestRate) => {
  //   const
  // }

  const resultDenominator = (resultPower - 1) / resultPower;

  const mortgagePayments =
    (loanAmount * (yearlyInterestRate / 12)) / resultDenominator;
  return mortgagePayments;
};

export const ResultCalculated = () => {
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [totalRepay, setTotalRepay] = useState(0);
  const { formData } = useFormContext();
  const { mortgageAmountInput, mortgageTerm, interestRate, mortgageType } =
    formData;

  useEffect(() => {
    if (mortgageType === "repayment") {
      const monthlyRepaymentResult = monthlyRepayments(
        Number(mortgageAmountInput),
        Number(mortgageTerm),
        Number(interestRate)
      );
      setMonthlyRepayment(monthlyRepaymentResult.toFixed(2));
      setTotalRepay((monthlyRepaymentResult * (mortgageTerm * 12)).toFixed(2));
    }
  }, [formData]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="result-calculated-main-wrapper">
        <h2>Your results</h2>
        <p className="result-calculated__paragraph mt-3">
          Your result are shown below based on the information you provided. To
          adjust the result, edit the form and click "Calculate repayments"
          again.
        </p>
        <div className="result-calculated__results-wrapper p-3 mt-4 rounded-2 ">
          <div className="monthly-repayments__wrapper d-flex flex-column pt-2">
            <span>Your monthly repayments</span>
            <span className="monthly-repayments__result">
              £{monthlyRepayment}
            </span>
          </div>
          <hr />
          <div className="result-repay__wrapper d-flex flex-column pt-2">
            <span>Total you&apos;ll repay over the term</span>
            <span className="result-repay__total mt-2">£{totalRepay}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
