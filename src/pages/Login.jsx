// import React from 'react';
import TextField from '@mui/material/TextField';
import '../pages/LoginStyles.css';

export default function Login() {
  return (
      <div className="login--form">
        <TextField id="standard-basic" label="Email" required variant="standard" color="secondary"/>
        <TextField id="standard-basic" label="Password" required variant="standard" color="secondary"/>
      </div>
  );
}