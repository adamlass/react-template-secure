import React from "react"
import { BrowserRouter as Route, Switch, NavLink, Redirect, Link } from "react-router-dom"
import facade from "../facade/Facade"

export default function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          facade.loggedIn() ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: "/notloggedin",
                  state: { from: props.location }
                }}
              />
            )
        }
      />
    );
  }