import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Grid,
  GridItem,
  Card,
  CardBody,
  Badge,
  Button,
  Image,
  Divider,
  SimpleGrid,
  Progress,
  useColorModeValue,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

interface VehicleDetailsProps {
  vehicleId: string;
  onBack: () => void;
  onEdit: () => void;
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicleId, onBack, onEdit }) => {
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');
  const statBg = useColorModeValue('gray.50', 'gray.700');

  // Datos del vehículo ABC-123 (mock data)
  const vehicle = {
    id: 1,
    plate: 'ABC-123',
    brand: 'Volvo',
    model: 'FH16',
    year: 2022,
    type: 'Camión',
    status: 'available',
    mileage: 45000,
    lastMaintenance: '2024-01-15',
    nextMaintenance: '2024-04-15',
    driver: 'Carlos Mendoza',
    location: 'Panamá',
    fuelLevel: 85,
    fuelCapacity: 400,
    engine: 'D16G 750 HP',
    transmission: 'I-Shift',
    vin: 'YV2RTZ0C8DA123456',
    registrationDate: '2022-03-15',
    insuranceExpiry: '2024-12-31',
    technicalInspection: '2024-06-30',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    documents: [
      { name: 'Registro Vehicular', status: 'vigente', expiry: '2025-03-15' },
      { name: 'Seguro', status: 'vigente', expiry: '2024-12-31' },
      { name: 'Revisión Técnica', status: 'vigente', expiry: '2024-06-30' },
      { name: 'Permiso de Circulación', status: 'vigente', expiry: '2024-12-31' },
    ],
    maintenanceHistory: [
      { date: '2024-01-15', type: 'Mantenimiento Preventivo', description: 'Cambio de aceite y filtros', cost: 450, status: 'completado' },
      { date: '2023-10-20', type: 'Reparación', description: 'Cambio de llantas delanteras', cost: 800, status: 'completado' },
      { date: '2023-08-10', type: 'Mantenimiento Preventivo', description: 'Revisión general del motor', cost: 650, status: 'completado' },
      { date: '2023-05-15', type: 'Reparación', description: 'Reparación del sistema de frenos', cost: 1200, status: 'completado' },
    ],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'green';
      case 'maintenance': return 'orange';
      case 'in_route': return 'blue';
      case 'damaged': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'maintenance': return 'Mantenimiento';
      case 'in_route': return 'En Ruta';
      case 'damaged': return 'Dañado';
      default: return 'Desconocido';
    }
  };

  const getDocumentStatusColor = (status: string) => {
    return status === 'vigente' ? 'green' : 'red';
  };

  return (
    <Box p={6} bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      <Container maxW="7xl">
        <VStack spacing={6} align="stretch">
          {/* Header - Responsive */}
          <VStack spacing={4} align="stretch" display={{ base: 'flex', md: 'none' }}>
            {/* Header móvil */}
            <HStack justify="space-between">
              <Button
                leftIcon={<Text>←</Text>}
                variant="outline"
                onClick={onBack}
                size="sm"
              >
                Volver
              </Button>
              <Badge
                colorScheme={getStatusColor(vehicle.status)}
                fontSize="sm"
                px={2}
                py={1}
                borderRadius="full"
              >
                {getStatusText(vehicle.status)}
              </Badge>
            </HStack>
            <VStack align="center" spacing={2}>
              <Heading size="md" color={headingColor} textAlign="center">
                🚛 {vehicle.plate}
              </Heading>
              <Text color={mutedTextColor} textAlign="center" fontSize="sm">
                {vehicle.brand} {vehicle.model} • {vehicle.year}
              </Text>
              <Button colorScheme="blue" onClick={onEdit} size="sm" w="full">
                ✏️ Editar Vehículo
              </Button>
            </VStack>
          </VStack>

          {/* Header - Desktop */}
          <HStack justify="space-between" align="center" display={{ base: 'none', md: 'flex' }}>
            <HStack spacing={4}>
              <Button
                leftIcon={<Text>←</Text>}
                variant="outline"
                onClick={onBack}
              >
                Volver
              </Button>
              <VStack align="start" spacing={0}>
                <Heading size="lg" color={headingColor}>
                  🚛 {vehicle.plate}
                </Heading>
                <Text color={mutedTextColor}>
                  {vehicle.brand} {vehicle.model} • {vehicle.year}
                </Text>
              </VStack>
            </HStack>
            
            <HStack spacing={3}>
              <Badge
                colorScheme={getStatusColor(vehicle.status)}
                fontSize="md"
                px={3}
                py={1}
                borderRadius="full"
              >
                {getStatusText(vehicle.status)}
              </Badge>
              <Button colorScheme="blue" onClick={onEdit}>
                ✏️ Editar
              </Button>
            </HStack>
          </HStack>

          <Grid templateColumns={{ base: '1fr', md: '1fr', lg: '2fr 1fr' }} gap={{ base: 4, md: 6 }}>
            {/* Información Principal */}
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
              {/* Imagen del vehículo */}
              <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
                <CardBody p={{ base: 3, md: 6 }}>
                  <Image
                    src={vehicle.image}
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    w="100%"
                    h={{ base: '200px', md: '250px', lg: '300px' }}
                    objectFit="cover"
                    borderRadius="lg"
                  />
                </CardBody>
              </Card>

              {/* Especificaciones Técnicas */}
              <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
                <CardBody p={{ base: 4, md: 6 }}>
                  <Heading size={{ base: 'sm', md: 'md' }} color={headingColor} mb={{ base: 3, md: 4 }}>
                    📋 Especificaciones Técnicas
                  </Heading>
                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 3, md: 4 }}>
                    <VStack align="start" spacing={2}>
                      <HStack justify="space-between" w="100%">
                        <Text color={mutedTextColor} fontSize="sm">VIN:</Text>
                        <Text color={textColor} fontSize="sm" fontWeight="600">{vehicle.vin}</Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text color={mutedTextColor} fontSize="sm">Motor:</Text>
                        <Text color={textColor} fontSize="sm" fontWeight="600">{vehicle.engine}</Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text color={mutedTextColor} fontSize="sm">Transmisión:</Text>
                        <Text color={textColor} fontSize="sm" fontWeight="600">{vehicle.transmission}</Text>
                      </HStack>
                    </VStack>
                    <VStack align="start" spacing={2}>
                      <HStack justify="space-between" w="100%">
                        <Text color={mutedTextColor} fontSize="sm">Tipo:</Text>
                        <Text color={textColor} fontSize="sm" fontWeight="600">{vehicle.type}</Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text color={mutedTextColor} fontSize="sm">Capacidad Combustible:</Text>
                        <Text color={textColor} fontSize="sm" fontWeight="600">{vehicle.fuelCapacity}L</Text>
                      </HStack>
                      <HStack justify="space-between" w="100%">
                        <Text color={mutedTextColor} fontSize="sm">Fecha de Registro:</Text>
                        <Text color={textColor} fontSize="sm" fontWeight="600">{vehicle.registrationDate}</Text>
                      </HStack>
                    </VStack>
                  </SimpleGrid>
                </CardBody>
              </Card>

              {/* Historial de Mantenimiento */}
              <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
                <CardBody p={{ base: 4, md: 6 }}>
                  <Heading size={{ base: 'sm', md: 'md' }} color={headingColor} mb={{ base: 3, md: 4 }}>
                    🔧 Historial de Mantenimiento
                  </Heading>
                  
                  {/* Vista de tabla - Desktop */}
                  <TableContainer display={{ base: 'none', md: 'block' }}>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>Fecha</Th>
                          <Th>Tipo</Th>
                          <Th>Descripción</Th>
                          <Th>Costo</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {vehicle.maintenanceHistory.map((maintenance, index) => (
                          <Tr key={index}>
                            <Td>{maintenance.date}</Td>
                            <Td>
                              <Badge
                                colorScheme={maintenance.type === 'Reparación' ? 'red' : 'blue'}
                                size="sm"
                              >
                                {maintenance.type}
                              </Badge>
                            </Td>
                            <Td>{maintenance.description}</Td>
                            <Td fontWeight="600">${maintenance.cost}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  {/* Vista de cards - Móvil */}
                  <VStack spacing={3} display={{ base: 'flex', md: 'none' }}>
                    {vehicle.maintenanceHistory.map((maintenance, index) => (
                      <Card key={index} bg={statBg} border="1px solid" borderColor={borderColor} w="full">
                        <CardBody p={3}>
                          <VStack spacing={2} align="stretch">
                            <HStack justify="space-between">
                              <Text fontSize="xs" color={mutedTextColor}>{maintenance.date}</Text>
                              <Badge
                                colorScheme={maintenance.type === 'Reparación' ? 'red' : 'blue'}
                                size="sm"
                              >
                                {maintenance.type}
                              </Badge>
                            </HStack>
                            <Text fontSize="sm" fontWeight="500">{maintenance.description}</Text>
                            <HStack justify="space-between">
                              <Text fontSize="xs" color={mutedTextColor}>Costo:</Text>
                              <Text fontSize="sm" fontWeight="600" color="green.500">${maintenance.cost}</Text>
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            </VStack>

            {/* Panel Lateral */}
            <VStack spacing={{ base: 4, md: 6 }} align="stretch">
              {/* Estadísticas Rápidas */}
              <SimpleGrid columns={{ base: 2, md: 1 }} spacing={{ base: 3, md: 4 }}>
                <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
                  <CardBody p={{ base: 3, md: 6 }}>
                    <Stat textAlign={{ base: 'center', md: 'left' }}>
                      <StatLabel color={mutedTextColor} fontSize={{ base: 'xs', md: 'sm' }}>Kilometraje</StatLabel>
                      <StatNumber color="blue.500" fontSize={{ base: 'lg', md: 'xl' }}>{vehicle.mileage.toLocaleString()}</StatNumber>
                      <StatHelpText fontSize={{ base: 'xs', md: 'sm' }}>kilómetros recorridos</StatHelpText>
                    </Stat>
                  </CardBody>
                </Card>

                <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
                  <CardBody p={{ base: 3, md: 6 }}>
                    <VStack align="stretch" spacing={{ base: 2, md: 3 }}>
                      <Text fontSize={{ base: 'xs', md: 'sm' }} color={mutedTextColor} textAlign={{ base: 'center', md: 'left' }}>Nivel de Combustible</Text>
                      <Progress
                        value={vehicle.fuelLevel}
                        colorScheme={vehicle.fuelLevel > 50 ? 'green' : vehicle.fuelLevel > 25 ? 'orange' : 'red'}
                        size="lg"
                        borderRadius="full"
                      />
                      <HStack justify="space-between">
                        <Text fontSize="lg" fontWeight="600" color={textColor}>
                          {vehicle.fuelLevel}%
                        </Text>
                        <Text fontSize="sm" color={mutedTextColor}>
                          {Math.round((vehicle.fuelLevel / 100) * vehicle.fuelCapacity)}L / {vehicle.fuelCapacity}L
                        </Text>
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              </SimpleGrid>

              {/* Información del Conductor */}
              <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
                <CardBody>
                  <Heading size="sm" color={headingColor} mb={3}>
                    👤 Conductor Asignado
                  </Heading>
                  <HStack spacing={3}>
                    <Avatar name={vehicle.driver} size="md" />
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="600" color={textColor}>{vehicle.driver}</Text>
                      <Text fontSize="sm" color={mutedTextColor}>Conductor Principal</Text>
                      <Text fontSize="sm" color={mutedTextColor}>📍 {vehicle.location}</Text>
                    </VStack>
                  </HStack>
                </CardBody>
              </Card>

              {/* Documentos */}
              <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
                <CardBody>
                  <Heading size="sm" color={headingColor} mb={3}>
                    📄 Documentos
                  </Heading>
                  <VStack align="stretch" spacing={2}>
                    {vehicle.documents.map((doc, index) => (
                      <HStack key={index} justify="space-between" p={2} bg={statBg} borderRadius="md">
                        <VStack align="start" spacing={0}>
                          <Text fontSize="sm" fontWeight="600" color={textColor}>{doc.name}</Text>
                          <Text fontSize="xs" color={mutedTextColor}>Vence: {doc.expiry}</Text>
                        </VStack>
                        <Badge colorScheme={getDocumentStatusColor(doc.status)} size="sm">
                          {doc.status}
                        </Badge>
                      </HStack>
                    ))}
                  </VStack>
                </CardBody>
              </Card>

              {/* Próximo Mantenimiento */}
              <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
                <CardBody>
                  <Heading size="sm" color={headingColor} mb={3}>
                    🔧 Próximo Mantenimiento
                  </Heading>
                  <VStack align="start" spacing={2}>
                    <HStack justify="space-between" w="100%">
                      <Text color={mutedTextColor} fontSize="sm">Último:</Text>
                      <Text color={textColor} fontSize="sm" fontWeight="600">{vehicle.lastMaintenance}</Text>
                    </HStack>
                    <HStack justify="space-between" w="100%">
                      <Text color={mutedTextColor} fontSize="sm">Próximo:</Text>
                      <Text color="orange.500" fontSize="sm" fontWeight="600">{vehicle.nextMaintenance}</Text>
                    </HStack>
                    <Button size="sm" colorScheme="orange" w="100%" mt={2}>
                      Programar Mantenimiento
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default VehicleDetails;
