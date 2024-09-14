import Button from "react-bootstrap/Button";
import IconCalculator from "../../assets/images/icon-calculator.svg";
import { UseAppContext } from "../../context/appContext";

export const ButtonForm = () => {
  const { Col } = UseAppContext();

  return (
    <Col xs={12} md={9} className="mt-2 mt-md-3">
      <Button
        type="submit"
        className="w-100 p-3 rounded-pill d-flex align-items-center justify-content-center gap-2"
      >
        <img src={IconCalculator} alt="illustration calculator icon" />
        Calculate Repayments
      </Button>
    </Col>
  );
};
