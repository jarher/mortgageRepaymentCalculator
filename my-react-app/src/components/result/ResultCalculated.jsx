/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useFormContext } from "../../context/appContext";
import { FramerMotionWrapper } from "./FramerMotionWrapper";

const monthlyRepayments = (loanAmount, mortgageTerm, interestRate) => {
  const numberOfPayments = mortgageTerm * 12;
  const yearlyInterestRate = interestRate / 100;
  const resultPower = Math.pow(
    (12 + yearlyInterestRate) / 12,
    numberOfPayments
  );

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
  const [resultStates, setResultStates] = useState({
    monthlyRepayment: 0,
    totalRepay: 0,
    totalInterest: 0,
  });
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
      // set monthlyRepayment and totalRepay value
      setResultStates((prev) => {
        return {
          ...prev,
          monthlyRepayment: formatCurrency(monthlyRepaymentResult),
          totalRepay: formatCurrency(
            monthlyRepaymentResult * (mortgageTerm * 12)
          ),
        };
      });
      return;
    }
    //set mortgage interest value
    setResultStates((prev) => {
      return {
        ...prev,
        totalInterest: formatCurrency(
          mortgageInterest(mortgageAmount, mortgageTrm, interest)
        ),
      };
    });
  }, [formData]);

  const framerMotionProps = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };
  return (
    <FramerMotionWrapper props={framerMotionProps}>
      <div className="result-calculated-main-wrapper">
        <h2>Your results</h2>
        <p className="result-calculated__paragraph mt-3">
          Your result are shown below based on the information you provided. To
          adjust the result, edit the form and click "Calculate repayments"
          again.
        </p>
        <div className="result-calculated__results-wrapper p-3 mt-4 rounded-2 ">
          {mortgageType === "repayment" ? (
            <TotalRepaymentComponent state={resultStates} />
          ) : (
            <TotalInterestComponent state={resultStates} />
          )}
        </div>
      </div>
    </FramerMotionWrapper>
  );
};

const TotalRepaymentComponent = ({ state }) => {
  return (
    <>
      <div className="monthly-repayments__wrapper d-flex flex-column pt-2">
        <span>Your monthly repayments</span>
        <span className="monthly-repayments__result">
          {state.monthlyRepayment}
        </span>
      </div>
      <hr />
      <div className="result-repay__wrapper d-flex flex-column pt-2">
        <span>Total you&apos;ll repay over the term</span>
        <span className="result-repay__total mt-2">{state.totalRepay}</span>
      </div>
    </>
  );
};

const TotalInterestComponent = ({ state }) => {
  return (
    <div className="monthly-repayments__wrapper d-flex flex-column pt-2">
      <span>Your total Interest</span>
      <span className="monthly-repayments__result">{state.totalInterest}</span>
    </div>
  );
};
