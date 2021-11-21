import React from 'react';
import { Route, Redirect } from 'react-router-dom';
function PrivateRouting({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('authToken') ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
}

export default PrivateRouting;
