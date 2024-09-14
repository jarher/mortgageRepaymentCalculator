/* eslint-disable react/prop-types */
import { UseAppContext } from "../../context/appContext.jsx";
import { FullScreenSection } from "../fullScreenSection/FullScreenSection.jsx";
import { ResultCalculated } from "./ResultCalculated.jsx";
import { ResultEmpty } from "./ResultEmpty.jsx";

export const Result = () => {
  const { isFormFilled } = UseAppContext();

  return (
    <div className="result__container d-flex align-items-center justify-content-center">
      <FullScreenSection>
        {isFormFilled ? <ResultCalculated /> : <ResultEmpty />}
      </FullScreenSection>
    </div>
  );
};
