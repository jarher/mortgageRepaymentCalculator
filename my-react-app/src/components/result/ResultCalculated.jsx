/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useFormContext } from "../../context/appContext";

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

  const resultDenominator = (1 - resultPower) / resultPower;

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
        mortgageAmountInput,
        mortgageTerm,
        interestRate
      );
      setMonthlyRepayment(monthlyRepaymentResult.toFixed(2));
      setTotalRepay((monthlyRepaymentResult * (mortgageTerm * 12)).toFixed(2));
    }
  }, [formData]);

  return (
    <>
      <h2 className="result-calculated__title">Your results</h2>
      <p className="result-calculated__paragraph">
        Your result are shown below based on the information you provided. To
        adjust the result, edit the form and click "Calculate repayments" again.
      </p>
      <div className="result-calculated__results-wrapper">
        <div className="monthly-repayments__wrapper">
          <span>Your monthly repayments</span>
          <span className="monthly-repayments__result">{monthlyRepayment}</span>
        </div>
        <hr />
        <div className="result-repay__wrapper">
          <span>Total you&apos;ll repay over the term</span>
          <span className="result-repay__total">{totalRepay}</span>
        </div>
      </div>
    </>
  );
};
