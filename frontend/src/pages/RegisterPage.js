import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Alerts from "../components/Alerts";
import FormGroup from "../components/FormGroup";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const RegisterPage = () => {
  const [values, setValues] = useState(initialState);

  const { isAlert, isLoading, displayAlert, register, user } = useAppContext();
  const navigate = useNavigate();

  const checkMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const newUser = { name, email, password };

    register(newUser);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, [2000]);
    }
  }, [user, navigate]);

  return (
    <Form className="register-form" onSubmit={handleSubmit}>
      <h4 className="register-header">
        {values.isMember ? "Sign In" : "Register"}
      </h4>

      {isAlert && <Alerts />}

      {!values.isMember && (
        <FormGroup
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
        />
      )}
      <FormGroup
        type="email"
        name="email"
        value={values.email}
        handleChange={handleChange}
      />
      <FormGroup
        type="password"
        name="password"
        value={values.password}
        handleChange={handleChange}
      />
      <Button variant="primary" type="submit" disabled={isLoading}>
        {values.isMember ? "Sign In" : "Register"}
      </Button>
      <div className="form-undertext">
        {values.isMember ? (
          <Form.Text className="text-muted">
            Don't have an account yet ?
          </Form.Text>
        ) : (
          <Form.Text className="text-muted">
            Already have an account ?
          </Form.Text>
        )}
        <Form.Text onClick={checkMember} className="check-member">
          {values.isMember ? "Register" : "Sign In"}
        </Form.Text>
      </div>
    </Form>
  );
};

export default RegisterPage;
