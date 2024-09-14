/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import * as yup from "yup";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import { createContext, useContext, useEffect, useRef } from "react";
import { UseAppContext } from "../../context/appContext";
import { FormGroup } from "./FormGroup";
import { FormRadio } from "./FormRadio";
import { ButtonForm } from "./ButtonForm";

const FormContext = createContext(undefined);

export const FormComponent = () => {
  const repaymentRadioRef = useRef(null);
  const interestRadioRef = useRef(null);
  const mortgageAmountRef = useRef(null);
  const mortgageTermRef = useRef(null);
  const interestRef = useRef(null);

  const { formFilled, setFormData, isClearForm, clearForm } = UseAppContext();

  const schema = yup.object().shape({
    mortgageAmountInput: yup.string().required("This field is required"),
    mortgageTerm: yup.string().required("This field is required"),
    interestRate: yup.string().required("This field is required"),
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
      [repaymentRadioRef, interestRadioRef].forEach(
        (element) => (element.current.checked = false)
      );
      clearForm(false);
    }
  }, [isClearForm]);

  return (
    <FormContext.Provider
      value={{
        formik,
        repaymentRadioRef,
        interestRadioRef,
        mortgageAmountRef,
        mortgageTermRef,
        interestRef,
        Form,
      }}
    >
      <Form noValidate onSubmit={formik.handleSubmit}>
        <FormGroup />
        <FormRadio />
        <ButtonForm />
      </Form>
    </FormContext.Provider>
  );
};

export const UseFormContext = () => useContext(FormContext);
