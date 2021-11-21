import React from 'react';
import { Link } from 'react-router-dom';
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
const Form = ({
  setUserName,
  setEmail,
  setPassword,
  setGender,
  submitHandler,
}) => {
  const paperStyle = {
    padding: '30px',
    width: 350,
    margin: '20px auto',
  };
  const marginTop = {
    marginTop: 30,
  };

  return (
    <Grid>
      <Paper elevation={15} style={paperStyle}>
        <Grid align='center'>
          <Avatar></Avatar>
          <h2 style={{ margin: 0 }}>Join Us!</h2>
          <Typography variant='caption'>
            Fill all needed information to make new account
          </Typography>
        </Grid>
        <form onSubmit={submitHandler}>
          <TextField
            onChange={(e) => setUserName(e.target.value)}
            variant='filled'
            label='User Name'
            fullWidth
            style={marginTop}
            required
          />
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            variant='filled'
            type='email'
            label='Email'
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
              name='radio-buttons-group'
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel
                value='female'
                control={<Radio />}
                label='Female'
              />
              <FormControlLabel value='male' control={<Radio />} label='Male' />
            </RadioGroup>
          </FormControl>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            variant='filled'
            type='password'
            label='Password'
            fullWidth
            required
            inputProps={{
              minLength: 8,
            }}
          />
          <Box textAlign='center'>
            <Button
              type='submit'
              variant='contained'
              style={{
                marginTop: 30,
                padding: 12,
              }}
              color='primary'
            >
              Sign Up
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
  );
};

export default Form;
