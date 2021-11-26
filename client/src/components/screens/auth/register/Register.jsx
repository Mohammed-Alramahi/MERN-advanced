import React, { useState } from 'react';
import Form from './Form';
import { Redirect } from 'react-router';
//const jwt = require('jsonwebtoken');
function Register() {
  return (
    <>{!localStorage.getItem('authToken') ? <Form /> : <Redirect to='/' />}</>
  );
}

export default Register;
