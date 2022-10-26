import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
// import "./LoginForm.css";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";

import { login, clearSessionErrors } from "../../store/session";
import HomePage from "../HomePage/HomePage";

function LoginForm() {
  const [email, setEmail] = useState("demo@user.io");
  const [password, setPassword] = useState("password");
  const errors = useSelector((state) => state.errors);
  const hasUser = useSelector((state) => !!state.session.user);
  const dispatch = useDispatch();
  console.log(hasUser);
  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === "email" ? setEmail : setPassword;
    return (e) => setState(e.currentTarget.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    setEmail("");
    setPassword("");
  };
  return (
    <>
      {!hasUser ? (
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Log In</h2>
          <div className="errors">{errors?.email}</div>
          <label>
            <span>Email</span>
            <Input
              type="text"
              value={email}
              onChange={update("email")}
              placeholder="Email"
            />
          </label>
          <div className="errors">{errors?.password}</div>
          <label>
            <span>Password</span>
            <Input
              type="password"
              value={password}
              onChange={update("password")}
              placeholder="Password"
            />
          </label>
          <Input type="submit" value="Log In" disabled={!email || !password} />
        </form>
      ) : (
        <Redirect to="/home">
          <HomePage />
        </Redirect>
      )}
    </>
  );
}

export default LoginForm;
