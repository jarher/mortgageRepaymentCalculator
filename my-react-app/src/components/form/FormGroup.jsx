/* eslint-disable react/prop-types */
import InputGroup from "react-bootstrap/InputGroup";
import { UseFormContext } from "./FormComponent";
import { UseAppContext } from "../../context/appContext";
import { NumberInput } from "./NumberFormatInput";

export const FormGroup = () => {
  const { formik, mortgageAmountRef, mortgageTermRef, interestRef, Form } =
    UseFormContext();
  const { Col, Row } = UseAppContext();

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
      type: "text",
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
      type: "text",
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
      type: "text",
      id: "interestRate",
      value: formik.values.interestRate,
      fieldProps: formik.getFieldProps("interestRate"),
      errors: formik.errors.interestRate,
    },
  ];

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

  return (
    <Row>
      {formGroupElements.map((props, i) => {
        const formGroupProps = {
          props,
          formik,
          clickHandler,
          inputHandler,
          blurHandler,
          Form,
          Col,
        };
        return <FormGroupWrapper {...formGroupProps} key={i} />;
      })}
    </Row>
  );
};

const FormGroupWrapper = ({
  props,
  clickHandler,
  inputHandler,
  blurHandler,
  Form,
  Col,
}) => {
  const {
    xs,
    md,
    hasClassNameMy3,
    id,
    labelName,
    isValid,
    elementRef,
    hasMortgageAmountInputGroupText,
    inputGroupText,
    errors,
    ...restProps
  } = props;

  const formControlWrapperProps = {
    ...restProps,
    onClick: () => clickHandler(elementRef),
    onInput: () => inputHandler(elementRef),
    onBlur: () => blurHandler(elementRef),
  };

  return (
    <Form.Group className={hasClassNameMy3 && "my-3"} as={Col} xs={xs} md={md}>
      <Form.Label htmlFor={id}>{labelName}</Form.Label>
      <InputGroup className="mb-3">
        <div
          className={`d-flex w-100 form-control-wrapper rounded ${isValid}`}
          ref={elementRef}
        >
          {hasMortgageAmountInputGroupText && (
            <InputGroup.Text>{inputGroupText}</InputGroup.Text>
          )}
          {/* return input with value formated */}
          <NumberInput
            formComponent={Form.Control}
            formProps={formControlWrapperProps}
          />
          {!hasMortgageAmountInputGroupText && (
            <InputGroup.Text>{inputGroupText}</InputGroup.Text>
          )}
        </div>
        <div className="form-error mt-2">{errors}</div>
      </InputGroup>
    </Form.Group>
  );
};
