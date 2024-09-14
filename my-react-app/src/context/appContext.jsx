/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import { createContext, useContext, useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    isClearForm: false,
    isFormFilled: false,
    formData: null,
  });
  return (
    <AppContext.Provider
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
        Col,
        Row,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const UseAppContext = () => useContext(AppContext);
