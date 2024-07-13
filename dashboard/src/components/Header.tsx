import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

export default Header;