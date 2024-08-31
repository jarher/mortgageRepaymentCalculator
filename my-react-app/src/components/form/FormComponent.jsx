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
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "../../context/appContext";

export const FormComponent = () => {
  const repaymentRadioRef = useRef(null);
  const interestRadioRef = useRef(null);
  const [isFocus, setIsFocus] = useState({
    isFocusMortgageAmount: false,
    isFocusMorgageTerm: false,
    isFocusInterestRate: false,
    isFocusRepayment: false,
    isFocusInterestOnly: false,
  });

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

  const focusHandler = (e) => {
    if (e.target.id === "mortgageAmountInput") {
      setIsFocus((state) => {
        return {
          ...state,
          isFocusMortgageAmount: !state.isFocusMortgageAmount,
        };
      });
    }
    if (e.target.id === "mortgageTerm") {
      setIsFocus((state) => {
        return {
          ...state,
          isFocusMorgageTerm: !state.isFocusMorgageTerm,
        };
      });
    }
    if (e.target.id === "interestRate") {
      setIsFocus((state) => {
        return {
          ...state,
          isFocusInterestRate: !state.isFocusInterestRate,
        };
      });
    }
    if (e.target.id === "mortgageTypeRepayment") {
      setIsFocus((state) => {
        return {
          ...state,
          isFocusInterestOnly: false,
          isFocusRepayment: !state.isFocusRepayment,
        };
      });
    }
    if (e.target.id === "mortgageTypeInterest") {
      setIsFocus((state) => {
        return {
          ...state,
          isFocusInterestOnly: !state.isFocusInterestOnly,
          isFocusRepayment: false,
        };
      });
    }
  };

  useEffect(() => {
    if (isClearForm) {
      formik.resetForm();
      repaymentRadioRef.current.checked = false;
      interestRadioRef.current.checked = false;
      clearForm(false);
      setIsFocus({
        isFocusMortgageAmount: false,
        isFocusMorgageTerm: false,
        isFocusInterestRate: false,
        isFocusRepayment: false,
        isFocusInterestOnly: false,
      });
    }
  }, [isClearForm]);

  return (
    <Form noValidate onSubmit={formik.handleSubmit} method="post">
      <Form.Group className="my-3">
        <Form.Label htmlFor="mortgageAmountInput">Mortgage Amount</Form.Label>
        <InputGroup className="mb-3">
          <div
            className={`d-flex w-100 form-control-wrapper rounded ${
              isFocus.isFocusMortgageAmount && "form-control-active"
            } ${formik.errors.mortgageAmountInput && "form-control-invalid"}`}
          >
            <InputGroup.Text>£</InputGroup.Text>
            <Form.Control
              type="number"
              id="mortgageAmountInput"
              onFocus={focusHandler}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.mortgageAmountInput}
              {...formik.getFieldProps("mortgageAmountInput")}
            />
          </div>
          <div className="form-error mt-2">
            {formik.errors.mortgageAmountInput}
          </div>
        </InputGroup>
      </Form.Group>
      <Row>
        <Form.Group as={Col} xs={12} md={6}>
          <Form.Label htmlFor="mortgageTerm">Mortgage Term</Form.Label>
          <InputGroup className="mb-3">
            <div
              className={`d-flex w-100 form-control-wrapper rounded ${
                isFocus.isFocusMorgageTerm && "form-control-active"
              } ${formik.errors.mortgageTerm && "form-control-invalid"}`}
            >
              <Form.Control
                type="number"
                id="mortgageTerm"
                onFocus={focusHandler}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.mortgageTerm}
                {...formik.getFieldProps("mortgageTerm")}
              />
              <InputGroup.Text>years</InputGroup.Text>
            </div>
            <div className="form-error mt-2">{formik.errors.mortgageTerm}</div>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} xs={12} md={6}>
          <Form.Label htmlFor="interestRate">Interest Rate</Form.Label>
          <InputGroup className="mb-3">
            <div
              className={`d-flex w-100 form-control-wrapper rounded ${
                isFocus.isFocusInterestRate && "form-control-active"
              } ${formik.errors.interestRate && "form-control-invalid"}`}
            >
              <Form.Control
                type="number"
                id="interestRate"
                onFocus={focusHandler}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.interestRate}
                {...formik.getFieldProps("interestRate")}
              />
              <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
            </div>
            <div className="form-error mt-2">{formik.errors.interestRate}</div>
          </InputGroup>
        </Form.Group>
      </Row>
      <fieldset>
        <Form.Group>
          <Form.Label as="legend" column xs={10}>
            Mortgage Type
          </Form.Label>
          <Col
            xs={12}
            className={`form-control-wrapper rounded py-2 px-3 mb-2 ${
              isFocus.isFocusRepayment && "radio-check-active"
            }`}
          >
            <Form.Check
              type="radio"
              label="Repayment"
              name="mortgageType"
              id="mortgageTypeRepayment"
              onFocus={focusHandler}
              onBlur={formik.handleBLur}
              onChange={formik.handleChange}
              value="repayment"
              ref={repaymentRadioRef}
            />
          </Col>
          <Col
            xs={12}
            className={`form-control-wrapper rounded py-2 px-3 ${
              isFocus.isFocusInterestOnly && "radio-check-active"
            }`}
          >
            <Form.Check
              type="radio"
              label="Interest Only"
              name="mortgageType"
              id="mortgageTypeInterest"
              onFocus={focusHandler}
              onBlur={formik.handleBLur}
              onChange={formik.handleChange}
              value="interest-only"
              ref={interestRadioRef}
            />
          </Col>
        </Form.Group>
        <div className="form-error mt-2 mb-md-3">
          {formik.errors.mortgageType}
        </div>
      </fieldset>

      <Col xs={12} md={8} className="mt-2 mt-md-3">
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
