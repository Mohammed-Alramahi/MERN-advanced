import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Box,
  RadioGroup,
} from '@mui/material';
import useForm from '../../../../hooks/form';
import Axios from '../../../../utils/axios';
const Form = () => {
  const history = useHistory();
  const paperStyle = {
    padding: '30px',
    width: 350,
    margin: '2rem auto',
  };
  const marginTop = {
    marginTop: 30,
  };

  const sendData = async (user) => {
    Axios.post('/auth/register', user)
      .then((req) => {
        console.log(req.data);
        localStorage.setItem('authToken', req.data.token);
        history.push('/');
      })
      .catch((err) => console.log(err.response.data));
  };

  const formData = useForm(sendData);
  return (
    <>
      <Grid>
        <Paper elevation={15} style={paperStyle}>
          <Grid align='center'>
            <Avatar></Avatar>
            <h1 style={{ margin: 0 }}>Register</h1>
            <Typography variant='caption'>
              Fill all needed information to make new account
            </Typography>
          </Grid>
          <form onSubmit={formData.handleSubmit}>
            <TextField
              onChange={formData.handleChange}
              variant='outlined'
              label='User Name'
              fullWidth
              name='userName'
              style={marginTop}
              required
            />
            <TextField
              onChange={formData.handleChange}
              variant='outlined'
              type='email'
              label='Email'
              name='email'
              fullWidth
              style={marginTop}
              required
            />

            <FormControl component='fieldset' style={marginTop}>
              <FormLabel component='legend'>Gender</FormLabel>
              <RadioGroup
                aria-label='gender'
                defaultValue='female'
                style={{ display: 'initial' }}
                name='gender'
                onChange={formData.handleChange}
              >
                <FormControlLabel
                  value='female'
                  control={<Radio />}
                  label='Female'
                />
                <FormControlLabel
                  value='male'
                  control={<Radio />}
                  label='Male'
                />
              </RadioGroup>
            </FormControl>
            <TextField
              onChange={formData.handleChange}
              variant='outlined'
              type='password'
              name='password'
              label='Password'
              fullWidth
              required
              inputProps={{
                minLength: 8,
              }}
              style={{ marginBottom: '1rem' }}
            />
            <Box textAlign='center'>
              <Button type='submit' color='success' variant='contained'>
                Submit Data
              </Button>
              <Link
                to='/login'
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  justifyContent: 'center',
                  alignContent: 'center',
                  fontSize: 24,
                }}
              >
                Already Have an account?
              </Link>
            </Box>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default Form;
