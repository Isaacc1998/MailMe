import {
  Button,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "./SignupForm.css";

import { signup, clearSessionErrors } from "../../store/session";

function SignupForm({ onClose }) {
  const [email, setEmail] = useState(
    (Math.random() + 1).toString(36).substring(7) + "@asd.io"
  );
  const [username, setUsername] = useState(
    (Math.random() + 1).toString(36).substring(7)
  );
  const [password, setPassword] = useState("password");
  const [password2, setPassword2] = useState("password");
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);
  const update = (field) => {
    let setState;

    switch (field) {
      case "email":
        setState = setEmail;
        break;
      case "username":
        setState = setUsername;
        break;
      case "password":
        setState = setPassword;
        break;
      case "password2":
        setState = setPassword2;
        break;
      default:
        throw Error("Unkown field in Signup Form");
    }
    return (e) => setState(e.currentTarget.value);
  };
  const usernameSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      username,
      password,
    };
    dispatch(signup(user)).then((e) => {
      console.log(e, "this is e");
      console.log(e.errors === undefined);
      // console.log(e.errors.length);
      if (e.errors === undefined) onClose(); // if there is NO errors, close it
    });
  };
  console.log(errors, "this errors");
  return (
    <>
      <form className="signup-form" onSubmit={usernameSubmit}>
        {/* {JSON.stringify(errors)} */}

        <FormLabel>
          <span>Email</span>
          <Input
            type="text"
            value={email}
            onChange={update("email")}
            placeholder="Email"
            isInvalid={errors?.email}
          />

          <Text color="red">{errors?.email}</Text>
        </FormLabel>

        <FormLabel>
          <span>Username</span>
          <Input
            type="text"
            value={username}
            onChange={update("username")}
            placeholder="Username"
            isInvalid={errors?.username}
          />
          <Text color="red">{errors?.username}</Text>
        </FormLabel>

        <FormLabel>
          <span>Password</span>
          <Input
            type="Password"
            value={password}
            onChange={update("password")}
            placeholder="Password"
            isInvalid={errors?.password}
          />
          <Text color="red">{errors?.password}</Text>
        </FormLabel>

        <FormLabel>
          <span>Confirm Password</span>
          <Input
            type="password"
            value={password2}
            onChange={update("password2")}
            placeholder="Confirm Password"
            isInvalid={
              password !== password2 && "Confirm Password field must match"
            }
          />
          <Text color="red">
            {password !== password2 && "Confirm Password field must match"}
          </Text>
        </FormLabel>
        <Button
          className="signup-button"
          type="submit"
          disabled={!email || !username || !password || password !== password2}
        >
          Sign up
        </Button>
      </form>
    </>
  );
}

export default SignupForm;
