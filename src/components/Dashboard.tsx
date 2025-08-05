import React from 'react';
import {
  Box,
  Container,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
  Progress,
  Badge,
  SimpleGrid,
  Flex,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';

const Dashboard: React.FC = () => {
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');
  const statLabelColor = useColorModeValue('gray.600', 'gray.300');
  const placeholderTextColor = useColorModeValue('gray.500', 'gray.400');
  const chartPlaceholderBg = useColorModeValue('gray.100', 'gray.700');
  const activityItemBg = useColorModeValue('gray.50', 'gray.700');
  const activityVehicleColor = useColorModeValue('gray.800', 'white');
  const activityActionColor = useColorModeValue('gray.600', 'gray.300');
  const activityTimeColor = useColorModeValue('gray.500', 'gray.400');
  const dashboardBg = useColorModeValue('gray.50', 'gray.900');

  // Mock data for the dashboard
  const fleetStats = {
    totalVehicles: 245,
    availableVehicles: 189,
    maintenanceVehicles: 14,
    damagedVehicles: 7,
    pendingTickets: 23,
    criticalAlerts: 5,
    highMileageVehicles: 12,
    pendingRevisions: 8,
    fuelEfficiency: 85.2,
    monthlyGrowth: 12.5,
  };

  const recentActivity = [
    { id: 1, vehicle: 'Camión ABC-123', action: 'Mantenimiento completado', time: '2 min ago', status: 'success' },
    { id: 2, vehicle: 'Van DEF-456', action: 'Reporte de daño', time: '15 min ago', status: 'error' },
    { id: 3, vehicle: 'Truck GHI-789', action: 'Revisión programada', time: '32 min ago', status: 'warning' },
    { id: 4, vehicle: 'Bus JKL-012', action: 'Kilometraje alto detectado', time: '1 hr ago', status: 'info' },
    { id: 5, vehicle: 'Pickup MNO-345', action: 'Ticket de servicio abierto', time: '2 hr ago', status: 'warning' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'green';
      case 'warning': return 'orange';
      case 'info': return 'blue';
      case 'error': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Box p={8} bg={dashboardBg} minH="100vh">
      <Container maxW="7xl">
        {/* Header */}
        <VStack spacing={6} align="stretch">
          <Box>
            <Heading size="xl" color={headingColor} mb={2}>
              🚛 Dashboard FlotaAdmin
            </Heading>
            <Text color={mutedTextColor} fontSize="lg">
              Panel de control de administración de flota vehicular
            </Text>
          </Box>

          {/* Main Stats Cards */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
            <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
              <CardBody>
                <Stat>
                  <StatLabel color={statLabelColor} fontSize="sm" fontWeight="600">
                    Vehículos Totales
                  </StatLabel>
                  <StatNumber fontSize="3xl" color={textColor}>
                    {fleetStats.totalVehicles}
                  </StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    {fleetStats.monthlyGrowth}% este mes
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
              <CardBody>
                <Stat>
                  <StatLabel color={statLabelColor} fontSize="sm" fontWeight="600">
                    Vehículos Disponibles
                  </StatLabel>
                  <StatNumber fontSize="3xl" color="green.500">
                    {fleetStats.availableVehicles}
                  </StatNumber>
                  <StatHelpText>
                    <Badge colorScheme="green" borderRadius="full">
                      {Math.round((fleetStats.availableVehicles / fleetStats.totalVehicles) * 100)}% disponible
                    </Badge>
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
              <CardBody>
                <Stat>
                  <StatLabel color={statLabelColor} fontSize="sm" fontWeight="600">
                    Tickets Pendientes
                  </StatLabel>
                  <StatNumber fontSize="3xl" color="blue.500">
                    {fleetStats.pendingTickets}
                  </StatNumber>
                  <StatHelpText>
                    <Badge colorScheme="blue" borderRadius="full">
                      Mantenimiento
                    </Badge>
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
              <CardBody>
                <Stat>
                  <StatLabel color={statLabelColor} fontSize="sm" fontWeight="600">
                    En Mantenimiento
                  </StatLabel>
                  <StatNumber fontSize="3xl" color="orange.500">
                    {fleetStats.maintenanceVehicles}
                  </StatNumber>
                  <StatHelpText>
                    <Badge colorScheme="orange" borderRadius="full">
                      Servicio
                    </Badge>
                  </StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Charts and Analytics Section */}
          <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
            {/* Main Chart Area */}
            <GridItem>
              <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md" color={headingColor}>
                      📈 Eficiencia de Combustible
                    </Heading>
                    <Box>
                      <Flex justify="space-between" mb={2}>
                        <Text fontSize="sm" color={mutedTextColor}>Promedio mensual</Text>
                        <Text fontSize="sm" fontWeight="600" color="green.500">
                          {fleetStats.fuelEfficiency}%
                        </Text>
                      </Flex>
                      <Progress 
                        value={fleetStats.fuelEfficiency} 
                        colorScheme="green" 
                        borderRadius="full" 
                        size="lg"
                      />
                    </Box>
                    
                    {/* Mock Chart Visualization */}
                    <Box h="200px" bg={chartPlaceholderBg} borderRadius="lg" display="flex" alignItems="center" justifyContent="center">
                      <VStack>
                        <Text fontSize="6xl">📈</Text>
                        <Text color={mutedTextColor} fontSize="sm">Gráfica de rendimiento</Text>
                        <Text color={placeholderTextColor} fontSize="xs">(Integración con Chart.js pendiente)</Text>
                      </VStack>
                    </Box>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>

            {/* Activity Feed */}
            <GridItem>
              <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
                <CardBody>
                  <VStack align="stretch" spacing={4}>
                    <Heading size="md" color={headingColor}>
                      🔔 Actividad Reciente
                    </Heading>
                    <VStack spacing={3} align="stretch">
                      {recentActivity.map((activity) => (
                        <Box key={activity.id} p={3} bg={activityItemBg} borderRadius="lg">
                          <HStack spacing={3}>
                            <Avatar size="sm" bg={`${getStatusColor(activity.status)}.500`} color="white">
                              🚛
                            </Avatar>
                            <VStack align="start" spacing={0} flex={1}>
                              <Text fontSize="sm" fontWeight="600" color={activityVehicleColor}>
                                {activity.vehicle}
                              </Text>
                              <Text fontSize="xs" color={activityActionColor}>
                                {activity.action}
                              </Text>
                              <Text fontSize="xs" color={activityTimeColor}>
                                {activity.time}
                              </Text>
                            </VStack>
                            <Badge 
                              colorScheme={getStatusColor(activity.status)} 
                              borderRadius="full"
                              size="sm"
                            >
                              •
                            </Badge>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          </Grid>

          {/* Bottom Statistics */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
              <CardBody>
                <VStack spacing={3}>
                  <Text fontSize="4xl">⛽</Text>
                  <Heading size="md" color="gray.800">Consumo de Combustible</Heading>
                  <Text color="gray.600" textAlign="center">
                    Promedio de 12.5 km/L en la flota
                  </Text>
                  <Progress value={75} colorScheme="blue" borderRadius="full" w="100%" />
                </VStack>
              </CardBody>
            </Card>

            <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
              <CardBody>
                <VStack spacing={3}>
                  <Text fontSize="4xl">🛣️</Text>
                  <Heading size="md" color="gray.800">Rutas Completadas</Heading>
                  <Text color="gray.600" textAlign="center">
                    1,247 rutas completadas este mes
                  </Text>
                  <Progress value={92} colorScheme="green" borderRadius="full" w="100%" />
                </VStack>
              </CardBody>
            </Card>

            <Card bg={cardBg} border="1px solid" borderColor={borderColor} borderRadius="xl" boxShadow="lg">
              <CardBody>
                <VStack spacing={3}>
                  <Text fontSize="4xl">🔧</Text>
                  <Heading size="md" color="gray.800">Mantenimientos</Heading>
                  <Text color="gray.600" textAlign="center">
                    23 mantenimientos programados
                  </Text>
                  <Progress value={65} colorScheme="orange" borderRadius="full" w="100%" />
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Dashboard;
