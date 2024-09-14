/* eslint-disable react/prop-types */
import { UseAppContext } from "../../context/appContext";
import { UseFormContext } from "./FormComponent";

export const FormRadio = () => {
  const { Col } = UseAppContext();
  const { formik, repaymentRadioRef, interestRadioRef, Form } =
    UseFormContext();

  const formRadioProps = [
    {
      className: "form-control-wrapper rounded py-2 px-3 mb-2",
      label: "Repayment",
      id: "mortgageTypeRepayment",
      value: "repayment",
      refElement: repaymentRadioRef,
    },
    {
      className: "form-control-wrapper rounded py-2 px-3",
      label: "Interest Only",
      id: "mortgageTypeInterest",
      value: "interest-only",
      refElement: interestRadioRef,
    },
  ];

  return (
    <fieldset>
      <Form.Group>
        <Form.Label as="legend" column xs={10}>
          Mortgage Type
        </Form.Label>
        {formRadioProps.map((props) => {
          const radioProps = {
            props,
            formik,
            Form,
            Col,
          };
          return <Radio {...radioProps} key={`${props.label}`} />;
        })}
      </Form.Group>
      <div className="form-error mt-2 mb-md-3">
        {formik.errors.mortgageType}
      </div>
    </fieldset>
  );
};

const Radio = ({ props, formik, Form, Col }) => {
  return (
    <Col xs={12} className={props.className}>
      <Form.Check
        type="radio"
        label={props.label}
        name="mortgageType"
        id={props.id}
        onChange={formik.handleChange}
        value={props.value}
        ref={props.refElement}
      />
    </Col>
  );
};
