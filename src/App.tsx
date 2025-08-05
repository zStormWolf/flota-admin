import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layout';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <ChakraProvider>
      <UserProvider>
        <ThemeProvider>
          <Layout />
        </ThemeProvider>
      </UserProvider>
    </ChakraProvider>
  );
}

export default App;
