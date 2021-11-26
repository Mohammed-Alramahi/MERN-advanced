import { Typography } from '@mui/material';
import React from 'react';

function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#FFFFFF',
        position: 'fixed',
        left: '0',
        bottom: '0',
        height: '80px',
        width: '100%',
      }}
    >
      <Typography variant='h6' align='center' color='#023e8a' gutterBottom>
        MERN ADVANCED
      </Typography>
      <Typography
        variant='subtitle1'
        align='center'
        color='#023e8a'
        gutterBottom
      >
        All Rights Reserved 2021 | MERN ADVANCED
      </Typography>
    </footer>
  );
}

export default Footer;
