import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';
import Form from './Form';
function Login() {
  return (
    <div>
      <Route
        render={() =>
          !localStorage.getItem('authToken') ? <Form /> : <Redirect to='/' />
        }
      />
    </div>
  );
}

export default Login;
