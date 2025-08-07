import React, { useState } from 'react';
import {
  Box,
  Container,
  Card,
  CardBody,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Progress,
  Flex,
  HStack,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Button,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

// Mock data para consumo de combustible
const mockConsumptionData = [
  {
    id: 1,
    vehiclePlate: 'ABC-123',
    vehicleBrand: 'Volvo FH16',
    fuelConsumed: 2450.5,
    distanceTraveled: 15200,
    efficiency: 6.20,
    cost: 2940.60,
    fuelType: 'Diesel',
    department: 'Logística',
    driver: 'Carlos Mendoza',
    period: 'Enero 2024',
    status: 'normal',
  },
  {
    id: 2,
    vehiclePlate: 'DEF-456',
    vehicleBrand: 'Mercedes Actros',
    fuelConsumed: 2890.2,
    distanceTraveled: 18500,
    efficiency: 6.40,
    cost: 3468.24,
    fuelType: 'Diesel',
    department: 'Transporte',
    driver: 'Ana López',
    period: 'Enero 2024',
    status: 'normal',
  },
  {
    id: 3,
    vehiclePlate: 'GHI-789',
    vehicleBrand: 'Ford Transit',
    fuelConsumed: 1250.8,
    distanceTraveled: 6800,
    efficiency: 5.44,
    cost: 1500.96,
    fuelType: 'Gasolina',
    department: 'Distribución',
    driver: 'Laura Jiménez',
    period: 'Enero 2024',
    status: 'low',
  },
  {
    id: 4,
    vehiclePlate: 'JKL-012',
    vehicleBrand: 'Isuzu NPR',
    fuelConsumed: 980.3,
    distanceTraveled: 5650,
    efficiency: 5.76,
    cost: 1176.36,
    fuelType: 'Diesel',
    department: 'Reparto',
    driver: 'Pedro Ramírez',
    period: 'Enero 2024',
    status: 'normal',
  },
  {
    id: 5,
    vehiclePlate: 'MNO-345',
    vehicleBrand: 'Volvo FH12',
    fuelConsumed: 3200.7,
    distanceTraveled: 16800,
    efficiency: 5.25,
    cost: 3840.84,
    fuelType: 'Diesel',
    department: 'Logística',
    driver: 'Patricia Morales',
    period: 'Enero 2024',
    status: 'alert',
  },
];

const Consumption: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');

  // Filtrar datos
  const filteredData = mockConsumptionData.filter(record => {
    const matchesSearch = record.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Estadísticas
  const stats = {
    totalFuel: filteredData.reduce((sum, r) => sum + r.fuelConsumed, 0),
    totalCost: filteredData.reduce((sum, r) => sum + r.cost, 0),
    totalDistance: filteredData.reduce((sum, r) => sum + r.distanceTraveled, 0),
    avgEfficiency: filteredData.length > 0 ? (filteredData.reduce((sum, r) => sum + r.efficiency, 0) / filteredData.length) : 0,
    vehicles: filteredData.length,
    alertVehicles: filteredData.filter(r => r.status === 'alert').length,
    lowEfficiencyVehicles: filteredData.filter(r => r.status === 'low').length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'green';
      case 'low': return 'yellow';
      case 'alert': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'normal': return 'Normal';
      case 'low': return 'Bajo';
      case 'alert': return 'Alerta';
      default: return 'Desconocido';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 6.0) return 'green';
    if (efficiency >= 5.5) return 'yellow';
    return 'red';
  };

  return (
    <Container maxW="full" p={8}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="lg" color={headingColor} mb={2}>
            ⛽ Consumo de Combustible
          </Heading>
          <Text color={mutedTextColor}>
            Análisis y monitoreo del consumo de combustible de la flota
          </Text>
        </Box>

        {/* Estadísticas principales */}
        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
          <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel color={mutedTextColor} fontSize="sm">Combustible Total</StatLabel>
                <StatNumber color="blue.500" fontSize="2xl">{stats.totalFuel.toLocaleString()} L</StatNumber>
                <StatHelpText>Este mes</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel color={mutedTextColor} fontSize="sm">Costo Total</StatLabel>
                <StatNumber color="green.500" fontSize="2xl">${stats.totalCost.toLocaleString()}</StatNumber>
                <StatHelpText>Este mes</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel color={mutedTextColor} fontSize="sm">Eficiencia Promedio</StatLabel>
                <StatNumber color="purple.500" fontSize="2xl">{stats.avgEfficiency.toFixed(2)} km/l</StatNumber>
                <StatHelpText>Rendimiento</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel color={mutedTextColor} fontSize="sm">Distancia Total</StatLabel>
                <StatNumber color="teal.500" fontSize="2xl">{stats.totalDistance.toLocaleString()} km</StatNumber>
                <StatHelpText>{stats.vehicles} vehículos</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Alertas */}
        {(stats.alertVehicles > 0 || stats.lowEfficiencyVehicles > 0) && (
          <Alert status="warning" borderRadius="lg">
            <AlertIcon />
            <Box>
              <AlertTitle>Vehículos que Requieren Atención</AlertTitle>
              <AlertDescription>
                {stats.alertVehicles > 0 && `${stats.alertVehicles} vehículo(s) con consumo en alerta. `}
                {stats.lowEfficiencyVehicles > 0 && `${stats.lowEfficiencyVehicles} vehículo(s) con baja eficiencia.`}
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {/* Controles */}
        <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
          <CardBody>
            <Flex direction={{ base: 'column', md: 'row' }} gap={4} align={{ md: 'center' }} justify="space-between">
              <VStack spacing={4} align="stretch" flex={1} display={{ base: 'flex', md: 'none' }}>
                {/* Controles móviles */}
                <InputGroup>
                  <InputLeftElement>
                    <Text color={mutedTextColor}>🔍</Text>
                  </InputLeftElement>
                  <Input
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
                <SimpleGrid columns={2} spacing={2}>
                  <Select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                    <option value="all">Todos</option>
                    <option value="Logística">Logística</option>
                    <option value="Transporte">Transporte</option>
                    <option value="Distribución">Distribución</option>
                    <option value="Reparto">Reparto</option>
                  </Select>
                  <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                    <option value="all">Todos</option>
                    <option value="normal">Normal</option>
                    <option value="low">Baja</option>
                    <option value="alert">Alerta</option>
                  </Select>
                </SimpleGrid>
                <Button colorScheme="blue" leftIcon={<Text>📊</Text>} size="sm">
                  Exportar
                </Button>
              </VStack>
              
              <HStack spacing={4} flex={1} display={{ base: 'none', md: 'flex' }}>
                <InputGroup maxW="300px">
                  <InputLeftElement>
                    <Text color={mutedTextColor}>🔍</Text>
                  </InputLeftElement>
                  <Input
                    placeholder="Buscar por placa, conductor o departamento..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>

                <Select maxW="150px" value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                  <option value="all">Todos los departamentos</option>
                  <option value="Logística">Logística</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Distribución">Distribución</option>
                  <option value="Reparto">Reparto</option>
                </Select>

                <Select maxW="150px" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">Todos los estados</option>
                  <option value="normal">Normal</option>
                  <option value="low">Baja eficiencia</option>
                  <option value="alert">Alerta</option>
                </Select>
              </HStack>

              <Button colorScheme="blue" leftIcon={<Text>📊</Text>}>
                Exportar Reporte
              </Button>
            </Flex>
          </CardBody>
        </Card>

        {/* Tabla de consumo - Desktop */}
        <Card bg={cardBg} border="1px solid" borderColor={borderColor} display={{ base: 'none', lg: 'block' }}>
          <CardBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Vehículo</Th>
                    <Th>Conductor</Th>
                    <Th>Departamento</Th>
                    <Th>Combustible</Th>
                    <Th>Distancia</Th>
                    <Th>Eficiencia</Th>
                    <Th>Costo</Th>
                    <Th>Estado</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredData.map((record) => (
                    <Tr key={record.id}>
                      <Td>
                        <VStack spacing={0} align="start">
                          <Text fontWeight="bold" fontSize="sm">{record.vehiclePlate}</Text>
                          <Text fontSize="xs" color={mutedTextColor}>{record.vehicleBrand}</Text>
                        </VStack>
                      </Td>
                      <Td>
                        <Text fontSize="sm">{record.driver}</Text>
                      </Td>
                      <Td>
                        <Badge colorScheme="blue" variant="subtle">
                          {record.department}
                        </Badge>
                      </Td>
                      <Td>
                        <VStack spacing={0} align="start">
                          <Text fontSize="sm" fontWeight="bold">{record.fuelConsumed.toLocaleString()} L</Text>
                          <Text fontSize="xs" color={mutedTextColor}>{record.fuelType}</Text>
                        </VStack>
                      </Td>
                      <Td>
                        <Text fontSize="sm">{record.distanceTraveled.toLocaleString()} km</Text>
                      </Td>
                      <Td>
                        <VStack spacing={0} align="start">
                          <Text fontSize="sm" fontWeight="bold" color={getEfficiencyColor(record.efficiency) + '.500'}>
                            {record.efficiency.toFixed(2)} km/l
                          </Text>
                          <Box w="60px" mt={1}>
                            <Progress
                              value={(record.efficiency / 8) * 100}
                              size="sm"
                              colorScheme={getEfficiencyColor(record.efficiency)}
                              borderRadius="md"
                            />
                          </Box>
                        </VStack>
                      </Td>
                      <Td>
                        <Text fontSize="sm" fontWeight="bold" color="green.500">
                          ${record.cost.toFixed(2)}
                        </Text>
                      </Td>
                      <Td>
                        <Badge colorScheme={getStatusColor(record.status)} borderRadius="full">
                          {getStatusText(record.status)}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
        </Card>

        {/* Vista de cards - Móvil y Tablet */}
        <Box display={{ base: 'block', lg: 'none' }}>
          <VStack spacing={4}>
            {filteredData.map((record) => (
              <Card key={record.id} bg={cardBg} border="1px solid" borderColor={borderColor} w="full">
                <CardBody>
                  <VStack spacing={3} align="stretch">
                    {/* Header del card */}
                    <HStack justify="space-between">
                      <VStack spacing={0} align="start">
                        <Text fontWeight="bold" fontSize="lg">{record.vehiclePlate}</Text>
                        <Text fontSize="sm" color={mutedTextColor}>{record.vehicleBrand}</Text>
                      </VStack>
                      <Badge colorScheme={getStatusColor(record.status)} borderRadius="full">
                        {getStatusText(record.status)}
                      </Badge>
                    </HStack>



                    {/* Información principal */}
                    <SimpleGrid columns={2} spacing={3}>
                      <VStack spacing={1} align="start">
                        <Text fontSize="xs" color={mutedTextColor}>Conductor</Text>
                        <Text fontSize="sm" fontWeight="bold">{record.driver}</Text>
                      </VStack>
                      <VStack spacing={1} align="start">
                        <Text fontSize="xs" color={mutedTextColor}>Departamento</Text>
                        <Badge colorScheme="blue" variant="subtle" fontSize="xs">
                          {record.department}
                        </Badge>
                      </VStack>
                      <VStack spacing={1} align="start">
                        <Text fontSize="xs" color={mutedTextColor}>Combustible</Text>
                        <Text fontSize="sm" fontWeight="bold">{record.fuelConsumed.toLocaleString()} L</Text>
                        <Text fontSize="xs" color={mutedTextColor}>{record.fuelType}</Text>
                      </VStack>
                      <VStack spacing={1} align="start">
                        <Text fontSize="xs" color={mutedTextColor}>Distancia</Text>
                        <Text fontSize="sm" fontWeight="bold">{record.distanceTraveled.toLocaleString()} km</Text>
                      </VStack>
                    </SimpleGrid>



                    {/* Eficiencia y costo */}
                    <HStack justify="space-between">
                      <VStack spacing={1} align="start">
                        <Text fontSize="xs" color={mutedTextColor}>Eficiencia</Text>
                        <HStack>
                          <Text fontSize="sm" fontWeight="bold" color={getEfficiencyColor(record.efficiency) + '.500'}>
                            {record.efficiency.toFixed(2)} km/l
                          </Text>
                          <Box w="40px">
                            <Progress
                              value={(record.efficiency / 8) * 100}
                              size="sm"
                              colorScheme={getEfficiencyColor(record.efficiency)}
                              borderRadius="md"
                            />
                          </Box>
                        </HStack>
                      </VStack>
                      <VStack spacing={1} align="end">
                        <Text fontSize="xs" color={mutedTextColor}>Costo Total</Text>
                        <Text fontSize="lg" fontWeight="bold" color="green.500">
                          ${record.cost.toFixed(2)}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </VStack>
        </Box>

        {/* Análisis por departamento */}
        <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
          <CardBody>
            <Heading size="md" mb={4} color={headingColor}>Análisis por Departamento</Heading>
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={4}>
              {['Logística', 'Transporte', 'Distribución', 'Reparto'].map(dept => {
                const deptData = mockConsumptionData.filter(r => r.department === dept);
                const deptStats = {
                  vehicles: deptData.length,
                  totalFuel: deptData.reduce((sum, r) => sum + r.fuelConsumed, 0),
                  totalCost: deptData.reduce((sum, r) => sum + r.cost, 0),
                  avgEfficiency: deptData.length > 0 ? deptData.reduce((sum, r) => sum + r.efficiency, 0) / deptData.length : 0,
                  alertCount: deptData.filter(r => r.status === 'alert').length,
                };

                return (
                  <Card key={dept} bg="gray.50" border="1px solid" borderColor={borderColor}>
                    <CardBody>
                      <VStack spacing={3} align="stretch">
                        <HStack justify="space-between">
                          <Text fontWeight="bold" fontSize="sm">{dept}</Text>
                          <Badge colorScheme="blue">{deptStats.vehicles} vehículos</Badge>
                        </HStack>
                        
                        <VStack spacing={2} align="stretch">
                          <HStack justify="space-between">
                            <Text fontSize="xs" color={mutedTextColor}>Combustible:</Text>
                            <Text fontSize="xs" fontWeight="bold">{deptStats.totalFuel.toLocaleString()} L</Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontSize="xs" color={mutedTextColor}>Costo:</Text>
                            <Text fontSize="xs" fontWeight="bold" color="green.500">${deptStats.totalCost.toLocaleString()}</Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontSize="xs" color={mutedTextColor}>Eficiencia:</Text>
                            <Text fontSize="xs" fontWeight="bold" color="purple.500">{deptStats.avgEfficiency.toFixed(2)} km/l</Text>
                          </HStack>
                          {deptStats.alertCount > 0 && (
                            <HStack justify="space-between">
                              <Text fontSize="xs" color={mutedTextColor}>Alertas:</Text>
                              <Badge colorScheme="red" size="sm">{deptStats.alertCount}</Badge>
                            </HStack>
                          )}
                        </VStack>
                      </VStack>
                    </CardBody>
                  </Card>
                );
              })}
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  );
};

export default Consumption;
