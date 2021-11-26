import React from 'react';
import useForm from '../../../../hooks/form';
import Axios from '../../../../utils/axios';
import { Button, TextField, Grid, Paper, Typography } from '@mui/material';
import { Redirect, useHistory, Link } from 'react-router-dom';

const paperStyle = {
  padding: '30px',
  width: 500,
  margin: '20px auto',
};

function Form() {
  const history = useHistory();

  const sendData = async (user) => {
    Axios.post('/auth/login', user)
      .then((req) => {
        console.log(req.data);
        localStorage.setItem('authToken', req.data.token);
        history.push('/');
      })
      .catch((err) => console.log(err.response.data));
  };

  const formData = useForm(sendData);
  return (
    <Grid align='center' style={{ marginTop: '2rem', marginBottom: '90px' }}>
      <Paper elevation={10} style={paperStyle}>
        <h1 style={{ margin: 0 }}>Login</h1>
        <Typography variant='caption'>Welcome Back!</Typography>
        <form onSubmit={formData.handleSubmit}>
          <TextField
            fullWidth
            name='email'
            type='email'
            label='E-mail'
            placeholder='Enter your E-mail'
            onChange={formData.handleChange}
            required
          />
          <TextField
            fullWidth
            name='password'
            label='Password'
            placeholder='Enter your password'
            onChange={formData.handleChange}
            type='password'
            style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}
            required
          />
          <Button
            type='submit'
            color='success'
            style={{ marginBottom: '1.5rem' }}
            variant='contained'
          >
            Submit Data
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/forgotpassword' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/register' style={{ marginRight: 20 }} variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}

export default Form;
