import React from "react";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Fallback from "./components/Fallback";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getUser } from "slices/authSlice";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function Routes() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth,
    shallowEqual
  );

  React.useEffect(() => {
    if (isAuthenticated && Object.keys(user).length === 0) {
      dispatch(getUser());
    }
  }, []);
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <Home />
        </PrivateRoute>
        <GuestRoute exact path="/login">
          <Login />
        </GuestRoute>
        <GuestRoute exact path="/register">
          <Register />
        </GuestRoute>
        <PrivateRoute exact path="/chat">
          <Chat />
        </PrivateRoute>
        <Route path="/*">
          <Fallback />
        </Route>
      </Switch>
    </Router>
  );
}

function GuestRoute({ children, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
