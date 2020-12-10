import { useMutation } from "@apollo/client";
import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";

import { REGISTER_USER } from "../utils/Queries";
import { hooks } from "../utils/Hooks";
import { AuthContext } from "../context/Auth";

function Register(props) {
  const context = useContext(AuthContext);

  const { onChange, onSubmit, values } = hooks(registerUser, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update: (_, { data: { register: userData } }) => {
      context.login(userData);
      props.history.push("/");
    },
    onError: (error) => {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1 className="page-title">Register</h1>

        <Form.Input
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          error={errors.username ? true : false}
          value={values.username}
          onChange={onChange}
        />
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          error={errors.email ? true : false}
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        />
        <Form.Input
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          error={errors.confirmPassword ? true : false}
          value={values.confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Register
        </Button>
        {Object.keys(errors).length > 0 && (
          <div className="ui negative message">
            <div class="header">Please enter correct information!</div>
            <ul className="list">
              {Object.keys(errors).map((error) => (
                <li key={error}>{errors[error]}</li>
              ))}
            </ul>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Register;
