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
import { useEffect } from "react";
import { useFormContext } from "../../context/appContext";

export const FormComponent = () => {
  const { formFilled, setFormData, isClearForm } = useFormContext();

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

  useEffect(() => {
    if (isClearForm) {
      formik.resetForm();
    }
  }, [isClearForm]);

  return (
    <Form noValidate onSubmit={formik.handleSubmit} method="post">
      <Form.Group className="mb-3">
        <Form.Label htmlFor="mortgageAmountInput">Mortgage Amount</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text>£</InputGroup.Text>
          <Form.Control
            type="number"
            id="mortgageAmountInput"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.mortgageAmountInput}
            {...formik.getFieldProps("mortgageAmountInput")}
            isInvalid={
              formik.touched.mortgageAmountInput &&
              !!formik.errors.mortgageAmountInput
            }
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.mortgageAmountInput}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Row className="mb-3">
        <Form.Group as={Col} className="mb-3">
          <Form.Label htmlFor="mortgageTerm">Mortgage Term</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              id="mortgageTerm"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.mortgageTerm}
              {...formik.getFieldProps("mortgageTerm")}
              isInvalid={
                formik.touched.mortgageTerm && !!formik.errors.mortgageTerm
              }
            />
            <InputGroup.Text>years</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {formik.errors.mortgageTerm}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} className="mb-3">
          <Form.Label htmlFor="interestRate">Interest Rate</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              id="interestRate"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.interestRate}
              {...formik.getFieldProps("interestRate")}
              isInvalid={
                formik.touched.interestRate && !!formik.errors.interestRate
              }
            />
            <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {formik.errors.interestRate}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column xs={10}>
            Radios
          </Form.Label>
          <Col xs={12}>
            <Form.Check
              type="radio"
              label="Repayment"
              name="mortgageType"
              id="mortgageTypeRepayment"
              onBlur={formik.handleBLur}
              onChange={formik.handleChange}
              value="repayment"
            />
          </Col>
          <Col xs={12}>
            <Form.Check
              type="radio"
              label="Interest Only"
              name="mortgageType"
              id="mortgageTypeInterest"
              onBlur={formik.handleBLur}
              onChange={formik.handleChange}
              value="interest-only"
            />
          </Col>
        </Form.Group>
        <div>{formik.errors.mortgageType}</div>
      </fieldset>

      <Button type="submit">
        <img src={IconCalculator} alt="illustration calculator icon" />
        Calculate Repayments
      </Button>
    </Form>
  );
};
