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
  InputRightElement,
  IconButton,
  Select,
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

interface LoginScreenProps {
  onLogin?: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [showCountries, setShowCountries] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes validar usuario/contraseña si quieres
    if (onLogin) onLogin();
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
      <Box
        position="relative"
        zIndex={2}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={4}
        py={8}
      >
        <Box
          bg={cardBg}
          backdropFilter="blur(10px)"
          borderRadius="20px"
          boxShadow="xl"
          p={8}
          w="100%"
          maxW="420px"
          border="1px solid"
          borderColor="whiteAlpha.300"
          mx="auto"
        >
          {/* Logo and Header */}
          <VStack spacing={4} align="center" mb={6}>
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
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="Ingresa tu contraseña"
                    bg={inputBg}
                    border="1.5px solid"
                    borderColor="gray.200"
                    borderRadius="xl"
                    size="lg"
                    pr="4.5rem"
                    _hover={{
                      borderColor: 'gray.300',
                    }}
                    _focus={{
                      borderColor: 'blue.400',
                      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
                    }}
                  />
                  <InputRightElement width="4.5rem">
                    <IconButton
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      icon={
                        <Box as="svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                          {showPassword ? (
                            // Eye slash icon (hidden)
                            <>
                              <path
                                d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <line
                                x1="2"
                                y1="2"
                                x2="22"
                                y2="22"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </>
                          ) : (
                            // Eye icon (visible)
                            <>
                              <path
                                d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <circle
                                cx="12"
                                cy="12"
                                r="3"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </>
                          )}
                        </Box>
                      }
                      variant="ghost"
                      size="sm"
                      color="gray.500"
                      onClick={() => setShowPassword(!showPassword)}
                      _hover={{
                        bg: 'gray.100',
                        color: 'gray.700',
                      }}
                      _active={{
                        bg: 'gray.200',
                      }}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Country Selector */}
              <FormControl position="relative">
                <FormLabel color="gray.700" fontWeight="600" fontSize="sm">
                  País
                </FormLabel>
                <Button
                  variant="outline"
                  w="100%"
                  h="50px"
                  justifyContent="space-between"
                  border="1.5px solid"
                  borderColor="gray.300"
                  borderRadius="xl"
                  bg={inputBg}
                  fontWeight="normal"
                  onClick={() => setShowCountries(!showCountries)}
                  _hover={{
                    borderColor: 'blue.400',
                    boxShadow: '0 0 0 1px #3182ce',
                  }}
                  _focus={{
                    borderColor: 'blue.500',
                    boxShadow: '0 0 0 3px rgba(49, 130, 206, 0.1)',
                  }}
                  transition="all 0.3s ease"
                >
                  <HStack>
                    <Text fontSize="lg">
                      {country ? (countries.find(c => c.value === country)?.flag || '🌍') : '🌍'}
                    </Text>
                    <Text color={country ? 'gray.800' : 'gray.500'}>
                      {country ? (countries.find(c => c.value === country)?.label || 'País') : 'Selecciona tu país'}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" color="gray.400">
                    {showCountries ? '▲' : '▼'}
                  </Text>
                </Button>
                
                {/* Custom Dropdown */}
                {showCountries && (
                  <Box
                    position="absolute"
                    top="100%"
                    left={0}
                    right={0}
                    zIndex={1000}
                    bg="white"
                    border="1.5px solid"
                    borderColor="gray.200"
                    borderRadius="xl"
                    boxShadow="xl"
                    mt={1}
                    maxH="200px"
                    overflowY="auto"
                  >
                    {countries.map((countryItem) => (
                      <Button
                        key={countryItem.value}
                        variant="ghost"
                        w="100%"
                        h="auto"
                        py={3}
                        px={4}
                        justifyContent="flex-start"
                        borderRadius="lg"
                        _hover={{ bg: 'blue.50' }}
                        onClick={() => {
                          setCountry(countryItem.value);
                          setShowCountries(false);
                        }}
                      >
                        <HStack>
                          <Text fontSize="lg">{countryItem.flag}</Text>
                          <Text>{countryItem.label}</Text>
                        </HStack>
                      </Button>
                    ))}
                  </Box>
                )}
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
              <VStack spacing={2} pt={3}>
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

      </Box>
      
      {/* Footer - positioned at bottom of screen */}
      <Box
        position="absolute"
        bottom={4}
        left={0}
        right={0}
        textAlign="center"
        zIndex={1}
      >
        <Text fontSize="xs" color="whiteAlpha.700">
          © 2024 FlotaAdmin
        </Text>
      </Box>
    </Box>
  );
};

export default LoginScreen;
