import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layout';
import LoginScreen from './components/LoginScreen';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(() => {
    return localStorage.getItem('flota-admin-logged-in') === 'true';
  });

  const handleLogin = () => {
    localStorage.setItem('flota-admin-logged-in', 'true');
    setIsLoggedIn(true);
  };

  return (
    <ChakraProvider>
      <UserProvider>
        <ThemeProvider>
          <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/flota-admin' : undefined}>
            <AppRoutes isLoggedIn={isLoggedIn} onLogin={handleLogin} />
          </BrowserRouter>
        </ThemeProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
