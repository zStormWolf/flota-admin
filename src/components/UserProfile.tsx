import React from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  CardBody,
  SimpleGrid,
  Badge,
  Divider,
  Button,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import UserAvatar from './UserAvatar';
import { useUser } from '../contexts/UserContext';

const UserProfile: React.FC = () => {
  const { user } = useUser();
  
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.700', 'white');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.300');
  const profileBg = useColorModeValue('gray.50', 'gray.900');
  const statLabelColor = useColorModeValue('gray.600', 'gray.300');

  const userInfo = {
    name: user.name,
    role: user.role,
    email: user.email,
    phone: user.phone,
    department: user.department,
    joinDate: 'Enero 2024',
    lastLogin: 'Hoy, 11:30 AM',
  };

  const userStats = {
    vehiclesManaged: 245,
    ticketsResolved: 156,
    reportsGenerated: 89,
    systemUptime: '99.8%',
  };

  return (
    <Box p={8} bg={profileBg} minH="100vh">
      <Container maxW="7xl">
        <VStack spacing={6} align="stretch">
          {/* Header */}
          <Box>
            <Heading size="xl" color={headingColor} mb={2}>
              👤 Perfil de Usuario
            </Heading>
            <Text color={mutedTextColor} fontSize="lg">
              Información personal y configuración de cuenta
            </Text>
          </Box>

          {/* Profile Card */}
          <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
            <CardBody p={8}>
              <HStack spacing={6} align="start">
                <UserAvatar size="2xl" />
                <VStack align="start" spacing={3} flex={1}>
                  <VStack align="start" spacing={1}>
                    <Heading size="lg" color={headingColor}>
                      {userInfo.name}
                    </Heading>
                    <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>
                      {userInfo.role}
                    </Badge>
                  </VStack>
                  
                  <VStack align="start" spacing={2} w="100%">
                    <HStack>
                      <Text fontSize="sm" color={mutedTextColor} w="120px">
                        📧 Email:
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        {userInfo.email}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text fontSize="sm" color={mutedTextColor} w="120px">
                        📱 Teléfono:
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        {userInfo.phone}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text fontSize="sm" color={mutedTextColor} w="120px">
                        🏢 Departamento:
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        {userInfo.department}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text fontSize="sm" color={mutedTextColor} w="120px">
                        📅 Ingreso:
                      </Text>
                      <Text fontSize="sm" color={textColor}>
                        {userInfo.joinDate}
                      </Text>
                    </HStack>
                    <HStack>
                      <Text fontSize="sm" color={mutedTextColor} w="120px">
                        🕐 Último acceso:
                      </Text>
                      <Text fontSize="sm" color="green.500">
                        {userInfo.lastLogin}
                      </Text>
                    </HStack>
                  </VStack>

                  <HStack spacing={3} pt={4}>
                    <Button colorScheme="blue" size="sm">
                      ✏️ Editar Perfil
                    </Button>
                    <Button variant="outline" size="sm">
                      🔐 Cambiar Contraseña
                    </Button>
                  </HStack>
                </VStack>
              </HStack>
            </CardBody>
          </Card>

          {/* User Statistics */}
          <Box>
            <Heading size="md" color={headingColor} mb={4}>
              📊 Estadísticas de Actividad
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
              <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
                <CardBody>
                  <Stat>
                    <StatLabel color={statLabelColor} fontSize="sm" fontWeight="600">
                      Vehículos Gestionados
                    </StatLabel>
                    <StatNumber fontSize="3xl" color="blue.500">
                      {userStats.vehiclesManaged}
                    </StatNumber>
                    <StatHelpText>
                      <Badge colorScheme="blue" borderRadius="full">
                        Total
                      </Badge>
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
                <CardBody>
                  <Stat>
                    <StatLabel color={statLabelColor} fontSize="sm" fontWeight="600">
                      Tickets Resueltos
                    </StatLabel>
                    <StatNumber fontSize="3xl" color="green.500">
                      {userStats.ticketsResolved}
                    </StatNumber>
                    <StatHelpText>
                      <Badge colorScheme="green" borderRadius="full">
                        Completados
                      </Badge>
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
                <CardBody>
                  <Stat>
                    <StatLabel color={statLabelColor} fontSize="sm" fontWeight="600">
                      Reportes Generados
                    </StatLabel>
                    <StatNumber fontSize="3xl" color="purple.500">
                      {userStats.reportsGenerated}
                    </StatNumber>
                    <StatHelpText>
                      <Badge colorScheme="purple" borderRadius="full">
                        Este mes
                      </Badge>
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>

              <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
                <CardBody>
                  <Stat>
                    <StatLabel color={statLabelColor} fontSize="sm" fontWeight="600">
                      Tiempo de Actividad
                    </StatLabel>
                    <StatNumber fontSize="3xl" color="orange.500">
                      {userStats.systemUptime}
                    </StatNumber>
                    <StatHelpText>
                      <Badge colorScheme="orange" borderRadius="full">
                        Sistema
                      </Badge>
                    </StatHelpText>
                  </Stat>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>

          {/* Recent Activity */}
          <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
            <CardBody>
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color={headingColor}>
                  🔔 Actividad Reciente del Usuario
                </Heading>
                <VStack spacing={3} align="stretch">
                  <Box p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                    <HStack justify="space-between">
                      <HStack spacing={3}>
                        <Text fontSize="lg">✅</Text>
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="600" color={textColor}>
                            Ticket #1234 resuelto
                          </Text>
                          <Text fontSize="xs" color={mutedTextColor}>
                            Mantenimiento preventivo completado
                          </Text>
                        </VStack>
                      </HStack>
                      <Text fontSize="xs" color={mutedTextColor}>
                        Hace 2 horas
                      </Text>
                    </HStack>
                  </Box>

                  <Box p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                    <HStack justify="space-between">
                      <HStack spacing={3}>
                        <Text fontSize="lg">📊</Text>
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="600" color={textColor}>
                            Reporte mensual generado
                          </Text>
                          <Text fontSize="xs" color={mutedTextColor}>
                            Análisis de consumo de combustible
                          </Text>
                        </VStack>
                      </HStack>
                      <Text fontSize="xs" color={mutedTextColor}>
                        Ayer
                      </Text>
                    </HStack>
                  </Box>

                  <Box p={3} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
                    <HStack justify="space-between">
                      <HStack spacing={3}>
                        <Text fontSize="lg">🔧</Text>
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="600" color={textColor}>
                            Configuración actualizada
                          </Text>
                          <Text fontSize="xs" color={mutedTextColor}>
                            Alertas de kilometraje modificadas
                          </Text>
                        </VStack>
                      </HStack>
                      <Text fontSize="xs" color={mutedTextColor}>
                        Hace 3 días
                      </Text>
                    </HStack>
                  </Box>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default UserProfile;
