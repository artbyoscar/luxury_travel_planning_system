// src/frontend/App.tsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@material-ui/core';
import Login from './components/Login';
import PreferencesForm from './components/PreferencesForm';
import DestinationSuggestions from './components/DestinationSuggestions';
import Itinerary from './components/Itinerary';
import Recommendations from './components/Recommendations';
import { auth } from './firebaseConfig'; // Import auth from firebaseConfig.ts
import { onAuthStateChanged } from 'firebase/auth';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color
    },
    secondary: {
      main: '#dc004e', // Secondary color
    },
  },
});

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading

  useEffect(() => {
    // Listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false); // Stop loading once auth state is determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // PrivateRoute component to protect routes
  const PrivateRoute: React.FC<{ component: React.FC; path: string; exact?: boolean }> = ({
    component: Component,
    ...rest
  }) => (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );

  if (loading) {
    // Optionally, you can replace this with a spinner or loading animation
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Switch>
            <Route
              path="/login"
              render={(props) => <Login {...props} />}
            />
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