import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Container,
  Heading,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';

const countries = [
  { value: 'panama', label: 'Panamá', flag: '🇵🇦' },
  { value: 'costa-rica', label: 'Costa Rica', flag: '🇨🇷' },
  { value: 'ecuador', label: 'Ecuador', flag: '🇪🇨' },
  { value: 'colombia', label: 'Colombia', flag: '🇨🇴' },
  { value: 'mexico', label: 'México', flag: '🇲🇽' },
  { value: 'argentina', label: 'Argentina', flag: '🇦🇷' },
  { value: 'chile', label: 'Chile', flag: '🇨🇱' },
  { value: 'peru', label: 'Perú', flag: '🇵🇪' },
  { value: 'venezuela', label: 'Venezuela', flag: '🇻🇪' },
  { value: 'brazil', label: 'Brasil', flag: '🇧🇷' },
];

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password, country });
  };

  // Color mode values
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)');
  const inputBg = useColorModeValue('white', 'gray.700');

  return (
    <Box
      minH="100vh"
      position="relative"
      bgImage="url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      {/* Dark overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.600"
        zIndex={1}
      />
      
      {/* Main content */}
      <Container
        maxW="md"
        centerContent
        position="relative"
        zIndex={2}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={4}
      >
        <Box
          bg={cardBg}
          backdropFilter="blur(10px)"
          borderRadius="2xl"
          boxShadow="2xl"
          p={8}
          w="100%"
          maxW="420px"
          border="1px solid"
          borderColor="whiteAlpha.200"
        >
          {/* Logo and Header */}
          <VStack spacing={6} align="center" mb={8}>
            <HStack spacing={3}>
              <Text fontSize="4xl">🚛</Text>
              <Heading size="xl" color="gray.700" fontWeight="bold">
                FlotaAdmin
              </Heading>
            </HStack>
            <Text fontSize="md" color="gray.600" textAlign="center">
              Sistema de Administración de Flota
            </Text>
          </VStack>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <VStack spacing={6}>
              {/* Username Field */}
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                  Usuario o Email
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Text fontSize="lg">👤</Text>
                  </InputLeftElement>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    placeholder="Ingresa tu usuario o email"
                    bg={inputBg}
                    border="1.5px solid"
                    borderColor="gray.200"
                    borderRadius="xl"
                    size="lg"
                    _hover={{
                      borderColor: 'gray.300',
                    }}
                    _focus={{
                      borderColor: 'blue.400',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                    }}
                  />
                </InputGroup>
              </FormControl>

              {/* Password Field */}
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                  Contraseña
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Text fontSize="lg">🔒</Text>
                  </InputLeftElement>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    bg={inputBg}
                    border="1.5px solid"
                    borderColor="gray.200"
                    borderRadius="xl"
                    size="lg"
                    _hover={{
                      borderColor: 'gray.300',
                    }}
                    _focus={{
                      borderColor: 'blue.400',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                    }}
                  />
                </InputGroup>
              </FormControl>

              {/* Country Selector */}
              <FormControl>
                <FormLabel fontSize="sm" fontWeight="600" color="gray.700">
                  País
                </FormLabel>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<Text fontSize="sm">▼</Text>}
                    w="100%"
                    bg={inputBg}
                    border="1.5px solid"
                    borderColor="gray.200"
                    borderRadius="xl"
                    size="lg"
                    textAlign="left"
                    fontWeight="normal"
                    pl={12}
                    _hover={{
                      borderColor: 'gray.300',
                      transform: 'translateY(-1px)',
                    }}
                    _active={{
                      borderColor: 'blue.400',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                      transform: 'translateY(-1px)',
                    }}
                    transition="all 0.3s ease"
                  >
                    <HStack>
                      <Text fontSize="lg" position="absolute" left={4}>🌍</Text>
                      <Text color={country ? 'gray.800' : 'gray.500'}>
                        {country 
                          ? `${countries.find(c => c.value === country)?.flag} ${countries.find(c => c.value === country)?.label}`
                          : 'Selecciona tu país'
                        }
                      </Text>
                    </HStack>
                  </MenuButton>
                  <MenuList
                    bg="white"
                    border="1.5px solid"
                    borderColor="gray.200"
                    borderRadius="xl"
                    boxShadow="xl"
                    py={2}
                  >
                    {countries.map((countryItem) => (
                      <MenuItem
                        key={countryItem.value}
                        onClick={() => setCountry(countryItem.value)}
                        _hover={{ bg: 'blue.50' }}
                        _focus={{ bg: 'blue.100' }}
                        borderRadius="lg"
                        mx={2}
                        my={1}
                      >
                        <Text fontSize="lg" mr={3}>{countryItem.flag}</Text>
                        <Text>{countryItem.label}</Text>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </FormControl>

              {/* Login Button */}
              <Button
                type="submit"
                w="100%"
                colorScheme="gray"
                size="lg"
                borderRadius="xl"
                fontWeight="600"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                _active={{
                  transform: 'translateY(-1px)',
                }}
              >
                Iniciar Sesión
              </Button>

              {/* Links */}
              <VStack spacing={3} pt={4}>
                <Button
                  variant="ghost"
                  fontSize="sm"
                  color="gray.600"
                  fontWeight="500"
                  _hover={{ color: 'gray.800' }}
                  onClick={() => console.log('Forgot password clicked')}
                >
                  ¿Olvidaste tu contraseña?
                </Button>
                <HStack spacing={1} fontSize="sm">
                  <Text color="gray.600">¿No tienes cuenta?</Text>
                  <Button
                    variant="ghost"
                    color="gray.800"
                    fontWeight="600"
                    p={0}
                    h="auto"
                    minW="auto"
                    _hover={{ textDecoration: 'underline' }}
                    onClick={() => console.log('Register clicked')}
                  >
                    Regístrate aquí
                  </Button>
                </HStack>
              </VStack>
            </VStack>
          </form>
        </Box>

        {/* Footer */}
        <Box
          position="absolute"
          bottom={4}
          textAlign="center"
        >
          <Text fontSize="xs" color="whiteAlpha.800">
            © 2024 FlotaAdmin. Todos los derechos reservados.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginScreen;
