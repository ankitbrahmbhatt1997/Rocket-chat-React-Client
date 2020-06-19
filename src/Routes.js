import React from "react";
import Chat from "./components/Chat";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Fallback from "./components/Fallback";
import { authContext } from "contexts";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function Routes() {
  const { isAuthenticated, getUser, user } = React.useContext(authContext);

  React.useEffect(() => {
    if (isAuthenticated && Object.keys(user).length === 0) {
      getUser();
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
  const { isAuthenticated } = React.useContext(authContext);
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
  const { isAuthenticated } = React.useContext(authContext);
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
