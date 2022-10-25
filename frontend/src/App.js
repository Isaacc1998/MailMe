import { Switch } from "react-router-dom";
// import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";

import MainPage from "./components/MainPage/MainPage";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupForm from "./components/SessionForms/SignupForm";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser } from "./store/session";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
      </Switch>
    </>
  );
}

export default App;
