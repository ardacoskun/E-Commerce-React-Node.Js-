import React from "react";
import { Form } from "react-bootstrap";

const FormGroup = ({
  name,
  value,
  type,
  labelName,
  handleChange,
  disabled,
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={name}>
        {labelName || name.charAt(0).toUpperCase() + name.slice(1)}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </Form.Group>
  );
};

export default FormGroup;
