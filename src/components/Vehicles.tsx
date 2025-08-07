import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  IconButton,
  useColorModeValue,
  Avatar,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  SimpleGrid,
} from '@chakra-ui/react';

// Mock data para vehículos
const mockVehicles = [
  {
    id: 1,
    plate: 'ABC-123',
    brand: 'Volvo',
    model: 'FH16',
    year: 2022,
    type: 'Camión',
    status: 'available',
    mileage: 45000,
    lastMaintenance: '2024-01-15',
    driver: 'Carlos Mendoza',
    location: 'Panamá',
    fuelLevel: 85,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
  },
  {
    id: 2,
    plate: 'DEF-456',
    brand: 'Mercedes',
    model: 'Actros',
    year: 2021,
    type: 'Camión',
    status: 'maintenance',
    mileage: 67000,
    lastMaintenance: '2024-01-10',
    driver: 'Ana García',
    location: 'Costa Rica',
    fuelLevel: 45,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
  },
  {
    id: 3,
    plate: 'GHI-789',
    brand: 'Scania',
    model: 'R450',
    year: 2023,
    type: 'Camión',
    status: 'in_route',
    mileage: 23000,
    lastMaintenance: '2024-01-20',
    driver: 'Miguel Torres',
    location: 'Ecuador',
    fuelLevel: 92,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
  },
  {
    id: 4,
    plate: 'JKL-012',
    brand: 'Ford',
    model: 'Transit',
    year: 2020,
    type: 'Van',
    status: 'available',
    mileage: 89000,
    lastMaintenance: '2024-01-05',
    driver: 'Laura Jiménez',
    location: 'Panamá',
    fuelLevel: 67,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
  },
  {
    id: 5,
    plate: 'MNO-345',
    brand: 'Isuzu',
    model: 'NPR',
    year: 2022,
    type: 'Camión Pequeño',
    status: 'damaged',
    mileage: 34000,
    lastMaintenance: '2023-12-28',
    driver: 'Roberto Silva',
    location: 'Costa Rica',
    fuelLevel: 23,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
  },
  {
    id: 6,
    plate: 'PQR-678',
    brand: 'Volvo',
    model: 'FH12',
    year: 2021,
    type: 'Camión',
    status: 'available',
    mileage: 56000,
    lastMaintenance: '2024-01-18',
    driver: 'Patricia Morales',
    location: 'Ecuador',
    fuelLevel: 78,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=200&fit=crop',
  },
];

const Vehicles: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const itemsPerPage = 6;

  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');
  const statBg = useColorModeValue('gray.50', 'gray.700');

  // Filtrar vehículos
  const filteredVehicles = mockVehicles.filter(vehicle => {
    const matchesSearch = vehicle.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.driver.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Paginación
  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVehicles = filteredVehicles.slice(startIndex, startIndex + itemsPerPage);

  // Función para obtener el color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'green';
      case 'maintenance': return 'orange';
      case 'in_route': return 'blue';
      case 'damaged': return 'red';
      default: return 'gray';
    }
  };

  // Función para obtener el texto del estado
  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'maintenance': return 'Mantenimiento';
      case 'in_route': return 'En Ruta';
      case 'damaged': return 'Dañado';
      default: return 'Desconocido';
    }
  };

  // Estadísticas
  const stats = {
    total: mockVehicles.length,
    available: mockVehicles.filter(v => v.status === 'available').length,
    maintenance: mockVehicles.filter(v => v.status === 'maintenance').length,
    inRoute: mockVehicles.filter(v => v.status === 'in_route').length,
    damaged: mockVehicles.filter(v => v.status === 'damaged').length,
  };

  return (
    <Box p={6} bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      <Container maxW="7xl">
        {/* Header */}
        <VStack spacing={{ base: 4, md: 6 }} align="stretch">
          <Box>
            <Heading size="lg" color={headingColor} mb={2}>
              🚛 Gestión de Vehículos
            </Heading>
            <Text color={mutedTextColor}>
              Administra y monitorea toda tu flota vehicular
            </Text>
          </Box>

          {/* Estadísticas */}
          <SimpleGrid columns={{ base: 2, sm: 3, md: 5 }} spacing={{ base: 2, md: 4 }}>
            <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel color={mutedTextColor} fontSize="sm">Total</StatLabel>
                  <StatNumber color="blue.500" fontSize="2xl">{stats.total}</StatNumber>
                  <StatHelpText>Vehículos</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            
            <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel color={mutedTextColor} fontSize="sm">Disponibles</StatLabel>
                  <StatNumber color="green.500" fontSize="2xl">{stats.available}</StatNumber>
                  <StatHelpText>Activos</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel color={mutedTextColor} fontSize="sm">En Ruta</StatLabel>
                  <StatNumber color="blue.500" fontSize="2xl">{stats.inRoute}</StatNumber>
                  <StatHelpText>Trabajando</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel color={mutedTextColor} fontSize="sm">Mantenimiento</StatLabel>
                  <StatNumber color="orange.500" fontSize="2xl">{stats.maintenance}</StatNumber>
                  <StatHelpText>En servicio</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
              <CardBody>
                <Stat>
                  <StatLabel color={mutedTextColor} fontSize="sm">Dañados</StatLabel>
                  <StatNumber color="red.500" fontSize="2xl">{stats.damaged}</StatNumber>
                  <StatHelpText>Requieren atención</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Controles */}
          <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
            <CardBody p={{ base: 3, md: 4 }}>
              <Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 3, md: 4 }} align="center">
                {/* Búsqueda */}
                <InputGroup maxW={{ base: '100%', md: '300px' }}>
                  <InputLeftElement pointerEvents="none">
                    <Text fontSize="lg">🔍</Text>
                  </InputLeftElement>
                  <Input
                    placeholder="Buscar vehículos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>

                {/* Filtro por estado */}
                <Select
                  maxW={{ base: '100%', md: '200px' }}
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Todos los estados</option>
                  <option value="available">Disponibles</option>
                  <option value="in_route">En Ruta</option>
                  <option value="maintenance">Mantenimiento</option>
                  <option value="damaged">Dañados</option>
                </Select>

                {/* Botones de vista */}
                <HStack spacing={2} ml="auto">
                  <IconButton
                    aria-label="Vista en cuadrícula"
                    icon={<Text fontSize="lg">⊞</Text>}
                    variant={viewMode === 'grid' ? 'solid' : 'outline'}
                    colorScheme="blue"
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  />
                  <IconButton
                    aria-label="Vista en tabla"
                    icon={<Text fontSize="lg">☰</Text>}
                    variant={viewMode === 'table' ? 'solid' : 'outline'}
                    colorScheme="blue"
                    size="sm"
                    onClick={() => setViewMode('table')}
                  />
                </HStack>

                {/* Botones de acción */}
                <HStack spacing={3} w={{ base: '100%', md: 'auto' }} justify={{ base: 'space-between', md: 'flex-start' }}>
                  <Button 
                    variant="outline" 
                    colorScheme="gray" 
                    leftIcon={<Text>🚫</Text>}
                    size={{ base: 'sm', md: 'md' }}
                    onClick={() => {
                      // TODO: Implementar navegación a vehículos desactivados
                      console.log('Navegando a vehículos desactivados');
                    }}
                  >
                    <Text display={{ base: 'none', sm: 'block' }}>Vehículos Desactivados</Text>
                    <Text display={{ base: 'block', sm: 'none' }}>Desactivados</Text>
                  </Button>
                  <Button 
                    colorScheme="blue" 
                    leftIcon={<Text>➕</Text>}
                    size={{ base: 'sm', md: 'md' }}
                    flexShrink={0}
                  >
                    <Text display={{ base: 'none', sm: 'block' }}>Agregar Vehículo</Text>
                    <Text display={{ base: 'block', sm: 'none' }}>Agregar</Text>
                  </Button>
                </HStack>
              </Flex>
            </CardBody>
          </Card>

          {/* Vista en cuadrícula */}
          {viewMode === 'grid' && (
            <Grid 
            templateColumns={{ 
              base: '1fr', 
              sm: 'repeat(2, 1fr)', 
              lg: 'repeat(3, 1fr)' 
            }} 
            gap={{ base: 4, md: 6 }}
            width="100%"
          >
              {paginatedVehicles.map((vehicle) => (
                <Card
                  key={vehicle.id}
                  bg={cardBg}
                  border="1px solid"
                  borderColor={borderColor}
                  _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                  transition="all 0.2s"
                >
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      {/* Imagen del vehículo */}
                      <Box
                        h="150px"
                        bg="gray.100"
                        borderRadius="lg"
                        bgImage={`url(${vehicle.image})`}
                        bgSize="cover"
                        bgPosition="center"
                        position="relative"
                      >
                        <Badge
                          colorScheme={getStatusColor(vehicle.status)}
                          position="absolute"
                          top={2}
                          right={2}
                          borderRadius="full"
                        >
                          {getStatusText(vehicle.status)}
                        </Badge>
                      </Box>

                      {/* Información del vehículo */}
                      <VStack spacing={2} align="stretch">
                        <HStack justify="space-between">
                          <Text fontSize="xl" fontWeight="bold" color={headingColor}>
                            {vehicle.plate}
                          </Text>
                          <Text fontSize="sm" color={mutedTextColor}>
                            {vehicle.year}
                          </Text>
                        </HStack>

                        <Text color={textColor} fontWeight="600">
                          {vehicle.brand} {vehicle.model}
                        </Text>

                        <HStack spacing={4}>
                          <VStack spacing={0} align="start">
                            <Text fontSize="xs" color={mutedTextColor}>Tipo</Text>
                            <Text fontSize="sm" color={textColor}>{vehicle.type}</Text>
                          </VStack>
                          <VStack spacing={0} align="start">
                            <Text fontSize="xs" color={mutedTextColor}>Kilometraje</Text>
                            <Text fontSize="sm" color={textColor}>{vehicle.mileage.toLocaleString()} km</Text>
                          </VStack>
                        </HStack>

                        <Divider />

                        <HStack justify="space-between">
                          <VStack spacing={0} align="start">
                            <Text fontSize="xs" color={mutedTextColor}>Conductor</Text>
                            <Text fontSize="sm" color={textColor}>{vehicle.driver}</Text>
                          </VStack>
                          <VStack spacing={0} align="end">
                            <Text fontSize="xs" color={mutedTextColor}>Ubicación</Text>
                            <Text fontSize="sm" color={textColor}>{vehicle.location}</Text>
                          </VStack>
                        </HStack>

                        {/* Nivel de combustible */}
                        <VStack spacing={1} align="stretch">
                          <HStack justify="space-between">
                            <Text fontSize="xs" color={mutedTextColor}>Combustible</Text>
                            <Text fontSize="xs" color={textColor}>{vehicle.fuelLevel}%</Text>
                          </HStack>
                          <Box bg="gray.200" h="4px" borderRadius="full">
                            <Box
                              bg={vehicle.fuelLevel > 50 ? 'green.400' : vehicle.fuelLevel > 25 ? 'orange.400' : 'red.400'}
                              h="100%"
                              borderRadius="full"
                              w={`${vehicle.fuelLevel}%`}
                            />
                          </Box>
                        </VStack>

                        {/* Botones de acción */}
                        <HStack spacing={2} pt={2}>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            flex={1}
                            onClick={() => {
                              if (vehicle.plate === 'ABC-123') {
                                navigate('/vehicle-details');
                              }
                            }}
                          >
                            Ver Detalles
                          </Button>
                          <Button 
                            size="sm" 
                            colorScheme="blue" 
                            flex={1}
                            onClick={() => {
                              if (vehicle.plate === 'ABC-123') {
                                navigate('/vehicle-edit');
                              }
                            }}
                          >
                            Editar
                          </Button>
                        </HStack>
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          )}

          {/* Vista en tabla */}
          {viewMode === 'table' && (
            <Card bg={cardBg} border="1px solid" borderColor={borderColor} overflowX="auto">
              <CardBody p={0}>
                <TableContainer>
                  <Table variant="simple" size={{ base: 'sm', md: 'md' }}>
                    <Thead>
                      <Tr>
                        <Th>Placa</Th>
                        <Th>Vehículo</Th>
                        <Th display={{ base: 'none', md: 'table-cell' }}>Estado</Th>
                        <Th display={{ base: 'none', lg: 'table-cell' }}>Conductor</Th>
                        <Th display={{ base: 'none', xl: 'table-cell' }}>Ubicación</Th>
                        <Th display={{ base: 'none', xl: 'table-cell' }}>Kilometraje</Th>
                        <Th>Combustible</Th>
                        <Th>Acciones</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {paginatedVehicles.map((vehicle) => (
                        <Tr key={vehicle.id}>
                          <Td>
                            <Text fontWeight="600">{vehicle.plate}</Text>
                          </Td>
                          <Td>
                            <VStack spacing={0} align="start">
                              <Text fontSize="sm" fontWeight="600">
                                {vehicle.brand} {vehicle.model}
                              </Text>
                              <Text fontSize="xs" color={mutedTextColor}>
                                {vehicle.type} • {vehicle.year}
                              </Text>
                            </VStack>
                          </Td>
                          <Td display={{ base: 'none', md: 'table-cell' }}>
                            <Badge colorScheme={getStatusColor(vehicle.status)} borderRadius="full">
                              {getStatusText(vehicle.status)}
                            </Badge>
                          </Td>
                          <Td display={{ base: 'none', lg: 'table-cell' }}>
                            <Text fontSize="sm">{vehicle.driver}</Text>
                          </Td>
                          <Td display={{ base: 'none', xl: 'table-cell' }}>
                            <Text fontSize="sm">{vehicle.location}</Text>
                          </Td>
                          <Td display={{ base: 'none', xl: 'table-cell' }}>
                            <Text fontSize="sm">{vehicle.mileage.toLocaleString()} km</Text>
                          </Td>
                          <Td>
                            <HStack spacing={2} minW="80px">
                              <Box
                                w={{ base: '30px', md: '40px' }}
                                h="6px"
                                bg="gray.200"
                                borderRadius="full"
                                overflow="hidden"
                              >
                                <Box
                                  h="100%"
                                  bg={vehicle.fuelLevel > 50 ? 'green.400' : vehicle.fuelLevel > 25 ? 'orange.400' : 'red.400'}
                                  w={`${vehicle.fuelLevel}%`}
                                />
                              </Box>
                              <Text fontSize="xs" display={{ base: 'none', sm: 'block' }}>{vehicle.fuelLevel}%</Text>
                            </HStack>
                          </Td>
                          <Td>
                            <HStack spacing={{ base: 0.5, md: 1 }}>
                              <IconButton
                                aria-label="Ver detalles"
                                icon={<Text fontSize={{ base: 'xs', md: 'sm' }}>👁️</Text>}
                                size={{ base: 'xs', md: 'sm' }}
                                variant="ghost"
                                onClick={() => {
                                  if (vehicle.plate === 'ABC-123') {
                                    navigate('/vehicle-details');
                                  }
                                }}
                              />
                              <IconButton
                                aria-label="Editar"
                                icon={<Text fontSize={{ base: 'xs', md: 'sm' }}>✏️</Text>}
                                size={{ base: 'xs', md: 'sm' }}
                                variant="ghost"
                                onClick={() => {
                                  if (vehicle.plate === 'ABC-123') {
                                    navigate('/vehicle-edit');
                                  }
                                }}
                              />
                              <IconButton
                                aria-label="Eliminar"
                                icon={<Text fontSize={{ base: 'xs', md: 'sm' }}>🗑️</Text>}
                                size={{ base: 'xs', md: 'sm' }}
                                variant="ghost"
                                colorScheme="red"
                              />
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
          )}

          {/* Paginación */}
          {totalPages > 1 && (
            <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
              <CardBody>
                <Flex justify="space-between" align="center" flexWrap="wrap" gap={3}>
                  <Text color={mutedTextColor} fontSize="sm" flexShrink={0}>
                    Mostrando {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredVehicles.length)} de {filteredVehicles.length} vehículos
                  </Text>
                  
                  <HStack spacing={2}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      isDisabled={currentPage === 1}
                    >
                      Anterior
                    </Button>
                    
                    {totalPages <= 5 ? (
                      Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                          key={page}
                          size="sm"
                          variant={currentPage === page ? 'solid' : 'outline'}
                          colorScheme={currentPage === page ? 'blue' : 'gray'}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      ))
                    ) : (
                      <>
                        {currentPage > 2 && (
                          <Button size="sm" variant="outline" onClick={() => setCurrentPage(1)}>1</Button>
                        )}
                        {currentPage > 3 && <Text px={2}>...</Text>}
                        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                          let page = currentPage;
                          if (currentPage === 1) page = i + 1;
                          else if (currentPage === totalPages) page = totalPages - 2 + i;
                          else page = currentPage - 1 + i;
                          
                          if (page < 1 || page > totalPages) return null;
                          
                          return (
                            <Button
                              key={page}
                              size="sm"
                              variant={currentPage === page ? 'solid' : 'outline'}
                              colorScheme={currentPage === page ? 'blue' : 'gray'}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </Button>
                          );
                        })}
                        {currentPage < totalPages - 2 && <Text px={2}>...</Text>}
                        {currentPage < totalPages - 1 && (
                          <Button size="sm" variant="outline" onClick={() => setCurrentPage(totalPages)}>
                            {totalPages}
                          </Button>
                        )}
                      </>
                    )}
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      isDisabled={currentPage === totalPages}
                    >
                      Siguiente
                    </Button>
                  </HStack>
                </Flex>
              </CardBody>
            </Card>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default Vehicles;
