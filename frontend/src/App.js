import { Switch, useHistory } from "react-router-dom";
// import { AuthRoute, ProtectedRoute } from "./components/Routes/Routes";
import { Route, Redirect } from "react-router-dom";

import Splash from "./components/Splash/Splash";
import LoginForm from "./components/SessionForms/LoginForm";
import SignupFormModal from "./components/SessionForms/SignupFormModal";
import HomePage from "./components/HomePage/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentUser, logout } from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const hasUser = useSelector((state) => !!state.session.user);
  const history = useHistory();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoad(true));
  }, [dispatch]);

  return (
    load && (
      <>
        <Switch>
          <Route exact path="/" component={Splash} />
          {!hasUser ? (
            <>
              <Route exact path="/login" component={LoginForm} />
            </>
          ) : (
            <>
              <Route exact path="/home" component={HomePage} />
            </>
          )}
        </Switch>
      </>
    )
  );
}

export default App;
