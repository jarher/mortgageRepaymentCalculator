/* eslint-disable react/prop-types */
import { FullScreenSection } from "../fullScreenSection/FullScreenSection.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FormComponent } from "../form/FormComponent.jsx";
import { useFormContext } from "../../context/appContext.jsx";

export const Mortgage = () => {
  const { clearForm, formFilled } = useFormContext();
  const handleReset = () => {
    clearForm(true);
    formFilled(false);
  };
  return (
    <div className="mortgage__container">
      <FullScreenSection>
        <Row>
          <Col>
            <h1>Mortgage Calculator</h1>
          </Col>
          <Col>
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
