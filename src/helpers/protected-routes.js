import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import React from "react";

const ProtectedRoutes = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return (
            <Redirect
              to={{ pathname: ROUTES.LOGIN, state: { from: location } }}
            />
          );
        }
      }}
    />
  );
};

ProtectedRoutes.propTypes = {
    user: PropTypes.object,
    children: PropTypes.object.isRequired 
}

export default ProtectedRoutes;
