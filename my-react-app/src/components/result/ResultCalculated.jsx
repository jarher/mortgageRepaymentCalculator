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

const mortgageInterest = (loanAmount, mortgageTerm, interestRate) => {
  return loanAmount * (interestRate / 100) * mortgageTerm;
};

const formatCurrency = (value) => {
  const result = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumSignificantDigits: 10,
  }).format(value.toFixed(2));
  return result;
};

export const ResultCalculated = () => {
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);
  const [totalRepay, setTotalRepay] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const { formData } = useFormContext();
  const { mortgageAmountInput, mortgageTerm, interestRate, mortgageType } =
    formData;

  useEffect(() => {
    const mortgageAmount = Number(mortgageAmountInput);
    const mortgageTrm = Number(mortgageTerm);
    const interest = Number(interestRate);

    if (mortgageType === "repayment") {
      const monthlyRepaymentResult = monthlyRepayments(
        mortgageAmount,
        mortgageTrm,
        interest
      );
      setMonthlyRepayment(formatCurrency(monthlyRepaymentResult));
      setTotalRepay(
        formatCurrency(monthlyRepaymentResult * (mortgageTerm * 12))
      );
      return;
    }
    setTotalInterest(
      formatCurrency(mortgageInterest(mortgageAmount, mortgageTrm, interest))
    );
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
          {mortgageType === "repayment" ? (
            <>
              <div className="monthly-repayments__wrapper d-flex flex-column pt-2">
                <span>Your monthly repayments</span>
                <span className="monthly-repayments__result">
                  {monthlyRepayment}
                </span>
              </div>
              <hr />
              <div className="result-repay__wrapper d-flex flex-column pt-2">
                <span>Total you&apos;ll repay over the term</span>
                <span className="result-repay__total mt-2">{totalRepay}</span>
              </div>
            </>
          ) : (
            <div className="monthly-repayments__wrapper d-flex flex-column pt-2">
              <span>Your total Interest</span>
              <span className="monthly-repayments__result">
                {totalInterest}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
