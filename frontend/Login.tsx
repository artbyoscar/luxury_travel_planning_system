// src/frontend/components/Login.tsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      onLogin();
      history.push('/preferences');
    } catch (error) {
      console.error('Login failed', error);
      // Display error message to the user
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const errorMessage = error.response.data.message;
        // Display the error message to the user
        alert(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
        alert('No response received from the server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error', error.message);
        alert('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
      </form>
    </Container>
  );
};

export default Login;