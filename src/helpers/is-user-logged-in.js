import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import React from "react";

const IsUserLoggedIn = ({ user, loggedInPath, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }

        if (user) {
          return (
            <Redirect
              to={{ pathname: loggedInPath, state: { from: location } }}
            />
          );
        }
      }}
    />
  );
};

IsUserLoggedIn.propTypes = {
    user: PropTypes.object,
    loggedInPath: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired 
}

export default IsUserLoggedIn;
