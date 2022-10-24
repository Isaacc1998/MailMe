import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const AuthRoute = ({ component: Component, path, exact }) => {
  const loggedIn = useSelector((state) => !!state.session.user);

  return (
    <Route
      path={path}
      exact={exact}
      render={(props) =>
        // change redirect to something else.
        !loggedIn ? <Component {...props} /> : <Redirect to="/tweets" />
      }
    />
  );
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => !!state.session.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
