/* eslint-disable react/prop-types */
import { FullScreenSection } from "../fullScreenSection/FullScreenSection.jsx";
import { FormComponent } from "../form/FormComponent.jsx";
import { UseAppContext } from "../../context/appContext.jsx";

export const Mortgage = () => {
  const { clearForm, formFilled, Col, Row } = UseAppContext();
  const handleReset = () => {
    clearForm(true);
    formFilled(false);
  };
  return (
    <div className="mortgage__container">
      <FullScreenSection>
        <Row className="align-items-end">
          <Col xs={12} sm={9}>
            <h1>Mortgage Calculator</h1>
          </Col>
          <Col xs={12} sm={3}>
            <span className="mortgage__reset-form" onClick={handleReset}>
              Clear All
            </span>
          </Col>
        </Row>
        <FormComponent />
      </FullScreenSection>
    </div>
  );
};
