import React from "react";
import { Alert } from "react-bootstrap";
import { useAppContext } from "../context/appContext";

const Alerts = () => {
  const { alertClass, alertMessage } = useAppContext();

  return (
    <Alert variant={alertClass} className="alert-container">
      <p>{alertMessage}</p>
    </Alert>
  );
};

export default Alerts;
