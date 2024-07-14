import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

interface Header {
  title: string;
  city: string;
}


const Header: React.FC<Header> = ({ title, city }) => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="h6" component="div">
            {city}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

export default Header;