import React, { useState } from 'react';
import Axios from '../../../../utils/axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Form from './Form';
import { Redirect } from 'react-router';
function Register() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('female');
  const [severity, setSeverity] = useState('success');
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [redirect, setRedirect] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const userInfo = {
      userName,
      email,
      password,
      gender,
    };
    const request = await Axios.post('/auth/register', userInfo).catch(
      (err) => {
        setAlertMessage(err.response.data.error);
        setOpen(true);
        setSeverity('error');
      }
    );
    if (request?.data.success) {
      const authToken = request.data.token;
      setOpen(true);
      setAlertMessage('Welcome on board!!');
      setSeverity('success');
      localStorage.setItem('authToken', authToken);
      setTimeout(() => {
        setRedirect(true);
      }, 1000);
    }
  };

  return (
    <>
      <Form
        setEmail={setEmail}
        setPassword={setPassword}
        setGender={setGender}
        setUserName={setUserName}
        submitHandler={submitHandler}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
      {redirect && <Redirect to='/login' />}
    </>
  );
}

export default Register;
