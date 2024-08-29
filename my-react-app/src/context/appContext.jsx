/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { createContext, useContext, useState } from "react";

const formContext = createContext(null);

export const FormProvider = ({ children }) => {
  const [state, setState] = useState({
    isClearForm: false,
    isFormFilled: false,
    formData: null,
  });
  return (
    <formContext.Provider
      value={{
        ...state,
        clearForm: (value) =>
          setState((prev) => {
            return {
              ...prev,
              isClearForm: value,
            };
          }),
        formFilled: (value) =>
          setState((prev) => {
            return {
              ...prev,
              isFormFilled: value,
            };
          }),
        setFormData: (value) => {
          setState((prev) => {
            return {
              ...prev,
              formData: value,
            };
          });
        },
      }}
    >
      {children}
    </formContext.Provider>
  );
};

export const useFormContext = () => useContext(formContext);
