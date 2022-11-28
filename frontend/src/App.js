import { Switch } from "react-router-dom";
// import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import { Route, Redirect } from "react-router-dom";

import Splash from "./components/Splash/Splash";
import SplashPage from "./components/SplashPage/SplashPage";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupFormModal from "./components/SessionForms/SignupFormModal";
import HomePage from "./components/HomePage/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "./store/session";
import SubscribeLink from "./SubscribeLinkPage/SubscribeLink";

function App() {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const hasUser = useSelector((state) => !!state.session.user);
  // console.log(hasUser, "has user");
  // console.log(load, "has load");
  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoad(true));
  }, [dispatch]);

  useEffect(() => {
    document.title = "MailMe";
  }, []);
  if (window.location.href.includes("subscribe")) return <SubscribeLink />;
  return (
    <>
      {load && (
        <>
          {!hasUser && (
            <>
              <Redirect to="/login" />
            </>
          )}
          {/* {!hasUser ? (
          <>
          <Redirect to="/login" />
          </>
          ) : (
            <>
            <Redirect to="/" />
            </>
          )} */}
          <Switch>
            {/* <Route exact path="/login" component={Splash} /> */}

            <Route exact path="/login" component={Splash} />
            <Route exact path="/about" component={SplashPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
