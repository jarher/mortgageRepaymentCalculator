/* eslint-disable react/prop-types */
import { useFormContext } from "../../context/appContext.jsx";
import { FullScreenSection } from "../fullScreenSection/FullScreenSection.jsx";
import { ResultCalculated } from "./ResultCalculated.jsx";
import { ResultEmpty } from "./ResultEmpty.jsx";

export const Result = () => {
  const { isFormFilled } = useFormContext();
  return (
    <div className="result__container">
      <FullScreenSection>
        {isFormFilled ? <ResultCalculated /> : <ResultEmpty />}
      </FullScreenSection>
    </div>
  );
};
