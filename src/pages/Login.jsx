import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Form, Button } from "semantic-ui-react";

import { LOGIN_USER } from "../utils/Queries";
import { hooks } from "../utils/Hooks";
import { AuthContext } from "../context/Auth";

function Login(props) {
  const context = useContext(AuthContext);

  const { onChange, onSubmit, values } = hooks(login, {
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update: (_, { data: { login: userData } }) => {
      context.login(userData);
      props.history.push("/");
    },
    onError: (error) => {
      setErrors(error.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function login() {
    loginUser();
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
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          error={errors.password ? true : false}
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
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

export default Login;
