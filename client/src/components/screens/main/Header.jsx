import { AppBar, Toolbar, Typography, Grid } from '@mui/material';
import { Link, Route, NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Home from '../home/Home.jsx';
import PrivateRouting from '../../routing/PrivateRouting';
import './header.css';
import HomeIcon from '@mui/icons-material/Home';
const styles = {
  linkText: {
    textDecoration: 'none',
    paddingRight: '15px',
    paddingTop: '16px',
    paddingBottom: '16px',
  },
};

function Header() {
  const [activeLink, setActiveLink] = useState({});
  useEffect(() => {}, [activeLink]);
  return (
    <Grid container>
      <AppBar
        position='relative'
        style={{ background: '#e65100', minWidth: '50%' }}
      >
        <Toolbar style={{ marginLeft: '10%' }}>
          <HomeIcon fontSize='large' sx={{ color: '#000' }} />
          <Typography color='#023047' variant='h5'>
            MERN ADVANCED
          </Typography>

          <Grid
            item
            wrap='nowrap'
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '20%',
            }}
          >
            <NavLink
              to='/login'
              id='home'
              style={{ textDecoration: 'none' }}
              activeClassName='active'
            >
              <Typography marginLeft='2vh' style={styles.linkText} variant='h5'>
                Home
              </Typography>
            </NavLink>
            <NavLink
              to='/register'
              style={{ textDecoration: 'none' }}
              activeClassName='active'
            >
              <Typography marginLeft='2vh' variant='h5' style={styles.linkText}>
                Register
              </Typography>
            </NavLink>
            <NavLink
              to='/posts'
              style={{ textDecoration: 'none' }}
              activeClassName='active'
            >
              <Typography marginLeft='2vh' variant='h5' style={styles.linkText}>
                Posts
              </Typography>
            </NavLink>
          </Grid>
        </Toolbar>
      </AppBar>
    </Grid>
  );
}

export default Header;
