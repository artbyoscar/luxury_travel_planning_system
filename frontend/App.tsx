// src/frontend/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@material-ui/core';
import Login from './components/Login';
import PreferencesForm from './components/PreferencesForm';
import DestinationSuggestions from './components/DestinationSuggestions';
import Itinerary from './components/Itinerary';
import Recommendations from './components/Recommendations';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlgw_1pSa0YbfsNRNDcG6IhS7QZ3NgMqY",
  authDomain: "luxurytravelplanningsystem.firebaseapp.com",
  projectId: "luxurytravelplanningsystem",
  storageBucket: "luxurytravelplanningsystem.appspot.com",
  messagingSenderId: "106801283144",
  appId: "1:106801283144:web:8a5a84fef8119b0ff7187d",
  measurementId: "G-EQM5PW6Q44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const PrivateRoute: React.FC<{ component: React.FC; path: string; exact?: boolean }> = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
        )
      }
    />
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" render={() => <Login onLogin={() => setIsLoggedIn(true)} />} />
            <PrivateRoute path="/preferences" component={PreferencesForm} />
            <PrivateRoute path="/suggestions" component={DestinationSuggestions} />
            <PrivateRoute path="/itinerary" component={Itinerary} />
            <PrivateRoute path="/recommendations" component={Recommendations} />
            <Redirect from="/" to="/login" />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;