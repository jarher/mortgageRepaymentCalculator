/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import IconCalculator from "../../assets/images/icon-calculator.svg";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { useFormContext } from "../../context/appContext";

export const FormComponent = () => {
  const repaymentRadioRef = useRef(null);
  const interestRadioRef = useRef(null);
  const mortgageAmountRef = useRef(null);
  const mortgageTermRef = useRef(null);
  const interestRef = useRef(null);

  const { formFilled, setFormData, isClearForm, clearForm } = useFormContext();

  const schema = yup.object().shape({
    mortgageAmountInput: yup
      .number()
      .required("This field is required")
      .positive()
      .integer(),
    mortgageTerm: yup
      .number()
      .required("This field is required")
      .positive()
      .integer(),
    interestRate: yup.number().required("This field is required").positive(),
    mortgageType: yup.string().required("This field is required"),
  });

  const formik = useFormik({
    initialValues: {
      mortgageAmountInput: "",
      mortgageTerm: "",
      interestRate: "",
      mortgageType: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      setFormData(values);
      formFilled(true);
    },
  });

  const clickHandler = (element) => {
    element.current.classList.add("form-control-active");
    element.current.classList.remove("form-control-invalid");
  };

  const inputHandler = (element) => {
    element.current.classList.add("form-control-active");
  };

  const blurHandler = (element) => {
    element.current.classList.remove("form-control-active");
  };

  useEffect(() => {
    if (isClearForm) {
      formik.resetForm();
      [repaymentRadioRef, interestRadioRef].forEach(
        (element) => (element.current.checked = false)
      );
      clearForm(false);
    }
  }, [isClearForm]);

  const formGroupElements = [
    {
      hasClassNameMy3: true,
      xs: 12,
      md: 12,
      hasMortgageAmountInputGroupText: true,
      elementRef: mortgageAmountRef,
      labelName: "Mortgage Amount",
      isValid: formik.errors.mortgageAmountInput ? "form-control-invalid" : "",
      inputGroupText: "£",
      type: "number",
      id: "mortgageAmountInput",
      value: formik.values.mortgageAmountInput,
      fieldProps: { ...formik.getFieldProps("mortgageAmountInput") },
      errors: formik.errors.mortgageAmountInput,
    },
    {
      hasClassNameMy3: false,
      xs: 12,
      md: 6,
      hasMortgageAmountInputGroupText: false,
      elementRef: mortgageTermRef,
      labelName: "Mortgage Term",
      isValid: formik.errors.mortgageTerm ? "form-control-invalid" : "",
      inputGroupText: "years",
      type: "number",
      id: "mortgageTerm",
      value: formik.values.mortgageTerm,
      fieldProps: { ...formik.getFieldProps("mortgageTerm") },
      errors: formik.errors.mortgageTerm,
    },
    {
      hasClassNameMy3: false,
      xs: 12,
      md: 6,
      hasMortgageAmountInputGroupText: false,
      elementRef: interestRef,
      labelName: "Interest Rate",
      isValid: formik.errors.interestRate ? "form-control-invalid" : "",
      inputGroupText: "%",
      type: "number",
      id: "interestRate",
      value: formik.values.interestRate,
      fieldProps: formik.getFieldProps("interestRate"),
      errors: formik.errors.interestRate,
    },
  ];

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
    <Form noValidate onSubmit={formik.handleSubmit}>
      <Row>
        {formGroupElements.map((props, i) => {
          const formGroupProps = {
            props,
            formik,
            clickHandler,
            inputHandler,
            blurHandler,
          };
          return <FormGroup {...formGroupProps} key={i} />;
        })}
      </Row>
      <fieldset>
        <Form.Group>
          <Form.Label as="legend" column xs={10}>
            Mortgage Type
          </Form.Label>
          {formRadioProps.map((props) => {
            const radioProps = {
              props,
              formik,
            };
            return <FormRadio {...radioProps} key={`${props.label}`} />;
          })}
        </Form.Group>
        <div className="form-error mt-2 mb-md-3">
          {formik.errors.mortgageType}
        </div>
      </fieldset>
      <Col xs={12} md={9} className="mt-2 mt-md-3">
        <Button
          type="submit"
          className="w-100 p-3 rounded-pill d-flex align-items-center justify-content-center gap-2"
        >
          <img src={IconCalculator} alt="illustration calculator icon" />
          Calculate Repayments
        </Button>
      </Col>
    </Form>
  );
};

const FormGroup = ({
  props,
  formik,
  clickHandler,
  inputHandler,
  blurHandler,
}) => {
  return (
    <Form.Group
      className={props.hasClassNameMy3 && "my-3"}
      as={Col}
      xs={props.xs}
      md={props.md}
    >
      <Form.Label htmlFor={props.id}>{props.labelName}</Form.Label>
      <InputGroup className="mb-3">
        <div
          className={`d-flex w-100 form-control-wrapper rounded ${props.isValid}`}
          ref={props.elementRef}
        >
          {props.hasMortgageAmountInputGroupText && (
            <InputGroup.Text>{props.inputGroupText}</InputGroup.Text>
          )}
          <Form.Control
            type="number"
            id={props.id}
            name={props.id}
            onClick={() => clickHandler(props.elementRef)}
            onInput={() => inputHandler(props.elementRef)}
            onBlur={() => blurHandler(props.elementRef)}
            value={props.value}
            {...formik.getFieldProps(props.id)}
          />
          {!props.hasMortgageAmountInputGroupText && (
            <InputGroup.Text>{props.inputGroupText}</InputGroup.Text>
          )}
        </div>
        <div className="form-error mt-2">{props.errors}</div>
      </InputGroup>
    </Form.Group>
  );
};

const FormRadio = ({ props, formik }) => {
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
