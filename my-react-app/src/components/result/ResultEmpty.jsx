/* eslint-disable react/no-unescaped-entities */
import IconEmpty from "../../assets/images/illustration-empty.svg";

export const ResultEmpty = () => {
  return (
    <div className="result-empty>__container">
      <img src={IconEmpty} alt="illustration empty icon" />
      <span className="result-empty__title">Results shown here</span>
      <p className="result-empty__paragraph">
        Complete the form and click "calculated repayments" to see what your
        monthly repayments would be
      </p>
    </div>
  );
};
