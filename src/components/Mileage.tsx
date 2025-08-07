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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Divider,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  Progress,
  Alert,
  AlertIcon,
  Tooltip,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

// Mock data para registros de kilometraje
const mockMileageRecords = [
  {
    id: 1,
    vehiclePlate: 'ABC-123',
    vehicleBrand: 'Volvo FH16',
    currentMileage: 45000,
    previousMileage: 44500,
    difference: 500,
    recordDate: '2024-01-15',
    driver: 'Carlos Mendoza',
    route: 'Panamá - Colón',
    fuelConsumed: 85.5,
    efficiency: 5.85, // km/l
    status: 'verified', // verified, pending, flagged
    notes: 'Viaje normal, sin incidencias',
    recordedBy: 'Sistema GPS',
    location: 'Panamá',
  },
  {
    id: 2,
    vehiclePlate: 'DEF-456',
    vehicleBrand: 'Mercedes Actros',
    currentMileage: 52000,
    previousMileage: 51200,
    difference: 800,
    recordDate: '2024-01-14',
    driver: 'Ana López',
    route: 'San José - Cartago',
    fuelConsumed: 120.0,
    efficiency: 6.67,
    status: 'verified',
    notes: 'Carga pesada, consumo normal',
    recordedBy: 'Conductor',
    location: 'Costa Rica',
  },
  {
    id: 3,
    vehiclePlate: 'GHI-789',
    vehicleBrand: 'Ford Transit',
    currentMileage: 89000,
    previousMileage: 88750,
    difference: 250,
    recordDate: '2024-01-13',
    driver: 'Laura Jiménez',
    route: 'Quito - Guayaquil',
    fuelConsumed: 45.2,
    efficiency: 5.53,
    status: 'flagged',
    notes: 'Consumo elevado, revisar vehículo',
    recordedBy: 'Sistema GPS',
    location: 'Ecuador',
  },
  {
    id: 4,
    vehiclePlate: 'JKL-012',
    vehicleBrand: 'Isuzu NPR',
    currentMileage: 34000,
    previousMileage: 33850,
    difference: 150,
    recordDate: '2024-01-12',
    driver: 'Pedro Ramírez',
    route: 'David - Santiago',
    fuelConsumed: 25.8,
    efficiency: 5.81,
    status: 'pending',
    notes: 'Pendiente de verificación',
    recordedBy: 'Conductor',
    location: 'Panamá',
  },
  {
    id: 5,
    vehiclePlate: 'MNO-345',
    vehicleBrand: 'Volvo FH12',
    currentMileage: 56000,
    previousMileage: 55400,
    difference: 600,
    recordDate: '2024-01-11',
    driver: 'Patricia Morales',
    route: 'Panamá - Chitré',
    fuelConsumed: 95.3,
    efficiency: 6.30,
    status: 'verified',
    notes: 'Viaje eficiente, buen rendimiento',
    recordedBy: 'Sistema GPS',
    location: 'Panamá',
  },
];

const Mileage: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const itemsPerPage = 10;

  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');
  const scrollbarThumbColor = useColorModeValue('gray.400', 'gray.600');
  const inputReadOnlyBg = useColorModeValue('gray.50', 'whiteAlpha.100');
  const statCardBg = useColorModeValue('gray.50', 'gray.700');
  const tableRowHoverBg = useColorModeValue('gray.50', 'gray.700');

  // Filtrar registros
  const filteredRecords = mockMileageRecords.filter(record => {
    const matchesSearch = record.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.route.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || record.location === locationFilter;
    
    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Paginación
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  // Estadísticas
  const stats = {
    total: mockMileageRecords.length,
    verified: mockMileageRecords.filter(r => r.status === 'verified').length,
    pending: mockMileageRecords.filter(r => r.status === 'pending').length,
    flagged: mockMileageRecords.filter(r => r.status === 'flagged').length,
    totalKm: mockMileageRecords.reduce((sum, r) => sum + r.difference, 0),
    avgEfficiency: (mockMileageRecords.reduce((sum, r) => sum + r.efficiency, 0) / mockMileageRecords.length).toFixed(2),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'green';
      case 'pending': return 'yellow';
      case 'flagged': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'verified': return 'Verificado';
      case 'pending': return 'Pendiente';
      case 'flagged': return 'Marcado';
      default: return 'Desconocido';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 6.0) return 'green';
    if (efficiency >= 5.0) return 'yellow';
    return 'red';
  };

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    onOpen();
  };

  const handleSave = () => {
    toast({
      title: 'Registro actualizado',
      description: 'El registro de kilometraje ha sido actualizado exitosamente.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Container maxW="full" p={8}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="lg" color={headingColor} mb={2}>
            📊 Gestión de Kilometrajes
          </Heading>
          <Text color={mutedTextColor}>
            Monitorea y administra los registros de kilometraje de toda tu flota
          </Text>
        </Box>

        {/* Estadísticas */}
        <Box 
          w="full" 
          overflowX="auto"
          pb={2}
          sx={{
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          <SimpleGrid 
            minW="max-content"
            columns={{ base: 2, sm: 3, md: 6 }}
            spacing={{ base: 2, md: 4 }}
            w="full"
          >
            <Card bg={cardBg} border="1px solid" borderColor={borderColor} minW="150px">
              <CardBody p={3}>
                <Stat>
                  <StatLabel color={mutedTextColor} fontSize={{ base: 'xs', sm: 'sm' }} whiteSpace="nowrap">Total Registros</StatLabel>
                  <StatNumber color="blue.500" fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}>{stats.total}</StatNumber>
                  <StatHelpText fontSize={{ base: 'xs', sm: 'sm' }}>Registros</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
            
            <Card bg={cardBg} border="1px solid" borderColor={borderColor} minW="150px">
              <CardBody p={3}>
                <Stat>
                  <StatLabel color={mutedTextColor} fontSize={{ base: 'xs', sm: 'sm' }} whiteSpace="nowrap">Verificados</StatLabel>
                  <StatNumber color="green.500" fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}>{stats.verified}</StatNumber>
                  <StatHelpText fontSize={{ base: 'xs', sm: 'sm' }}>Confirmados</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} border="1px solid" borderColor={borderColor} minW="150px">
              <CardBody p={3}>
                <Stat>
                  <StatLabel color={mutedTextColor} fontSize={{ base: 'xs', sm: 'sm' }} whiteSpace="nowrap">Pendientes</StatLabel>
                  <StatNumber color="yellow.500" fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}>{stats.pending}</StatNumber>
                  <StatHelpText fontSize={{ base: 'xs', sm: 'sm' }}>Por revisar</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} border="1px solid" borderColor={borderColor} minW="150px">
              <CardBody p={3}>
                <Stat>
                  <StatLabel color={mutedTextColor} fontSize={{ base: 'xs', sm: 'sm' }} whiteSpace="nowrap">Marcados</StatLabel>
                  <StatNumber color="red.500" fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}>{stats.flagged}</StatNumber>
                  <StatHelpText fontSize={{ base: 'xs', sm: 'sm' }}>Revisar</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} border="1px solid" borderColor={borderColor} minW="150px">
              <CardBody p={3}>
                <Stat>
                  <StatLabel color={mutedTextColor} fontSize={{ base: 'xs', sm: 'sm' }} whiteSpace="nowrap">Total KM</StatLabel>
                  <StatNumber color="purple.500" fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}>
                    {stats.totalKm > 1000 ? `${(stats.totalKm / 1000).toFixed(1)}k` : stats.totalKm}
                  </StatNumber>
                  <StatHelpText fontSize={{ base: 'xs', sm: 'sm' }}>Kilómetros</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card bg={cardBg} border="1px solid" borderColor={borderColor} minW="150px">
              <CardBody p={3}>
                <Stat>
                  <StatLabel color={mutedTextColor} fontSize={{ base: 'xs', sm: 'sm' }} whiteSpace="nowrap">Eficiencia</StatLabel>
                  <StatNumber color="teal.500" fontSize={{ base: 'lg', sm: 'xl', md: '2xl' }}>{stats.avgEfficiency}</StatNumber>
                  <StatHelpText fontSize={{ base: 'xs', sm: 'sm' }}>km/l</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>
        </Box>

        {/* Controles */}
        <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
          <CardBody p={{ base: 3, md: 4 }}>
            <Flex direction={{ base: 'column', md: 'row' }} gap={3} align={{ base: 'stretch', md: 'center' }} justify="space-between">
              {/* Filtros - Móvil */}
              <VStack spacing={3} align="stretch" flex={1} display={{ base: 'flex', md: 'none' }} w="full">
                <InputGroup size="sm">
                  <InputLeftElement pointerEvents="none">
                    <Text color={mutedTextColor}>🔍</Text>
                  </InputLeftElement>
                  <Input
                    placeholder="Buscar vehículo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    pr={2}
                  />
                </InputGroup>
                
                <SimpleGrid columns={2} spacing={2} w="full">
                  <Select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)} 
                    size="sm"
                    fontSize="sm"
                  >
                    <option value="all">Todos</option>
                    <option value="verified">Verificados</option>
                    <option value="pending">Pendientes</option>
                    <option value="flagged">Marcados</option>
                  </Select>
                  
                  <Select 
                    value={locationFilter} 
                    onChange={(e) => setLocationFilter(e.target.value)} 
                    size="sm"
                    fontSize="sm"
                  >
                    <option value="all">Todas</option>
                    <option value="Panamá">Panamá</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Ecuador">Ecuador</option>
                  </Select>
                </SimpleGrid>
              </VStack>
              
              {/* Filtros - Desktop */}
              <HStack 
                spacing={3} 
                flex={1} 
                display={{ base: 'none', md: 'flex' }}
                align="center"
                wrap="wrap"
              >
                <InputGroup maxW="300px" size="sm">
                  <InputLeftElement pointerEvents="none">
                    <Text color={mutedTextColor}>🔍</Text>
                  </InputLeftElement>
                  <Input
                    placeholder="Buscar por placa, conductor o ruta..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fontSize="sm"
                  />
                </InputGroup>

                <Select 
                  value={statusFilter} 
                  onChange={(e) => setStatusFilter(e.target.value)}
                  size="sm"
                  minW="160px"
                  fontSize="sm"
                >
                  <option value="all">Todos los estados</option>
                  <option value="verified">Verificados</option>
                  <option value="pending">Pendientes</option>
                  <option value="flagged">Marcados</option>
                </Select>

                <Select 
                  value={locationFilter} 
                  onChange={(e) => setLocationFilter(e.target.value)}
                  size="sm"
                  minW="160px"
                  fontSize="sm"
                >
                  <option value="all">Todas las ubicaciones</option>
                  <option value="Panamá">Panamá</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Ecuador">Ecuador</option>
                </Select>
              </HStack>

              {/* Botones de acción */}
              <Button 
                colorScheme="blue" 
                leftIcon={<Text>📝</Text>} 
                size="sm"
                w={{ base: 'full', md: 'auto' }}
                mt={{ base: 2, md: 0 }}
              >
                <Text display={{ base: 'none', sm: 'block' }}>Registrar Kilometraje</Text>
                <Text display={{ base: 'block', sm: 'none' }}>Nuevo</Text>
              </Button>
            </Flex>
          </CardBody>
        </Card>

        {/* Alerta para registros marcados */}
        {stats.flagged > 0 && (
          <Alert status="warning" borderRadius="lg">
            <AlertIcon />
            <Box>
              <AlertTitle>Registros Marcados</AlertTitle>
              <AlertDescription>
                Hay {stats.flagged} registro(s) marcados que requieren atención. Revisa los registros con consumo elevado o inconsistencias.
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {/* Tabla de kilometrajes */}
        <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
          <CardBody p={0}>
            <Box 
              w="full" 
              overflowX="auto"
              sx={{
                '&::-webkit-scrollbar': { height: '6px' },
                '&::-webkit-scrollbar-thumb': { 
                  bg: scrollbarThumbColor, 
                  borderRadius: '3px' 
                },
                '&::-webkit-scrollbar-track': { bg: 'transparent' },
                scrollbarWidth: 'thin',
                scrollbarColor: `${scrollbarThumbColor} transparent`
              }}
            >
              <TableContainer 
                minW={{ base: 'max-content', md: '100%' }}
                maxW="100%"
                overflowX="auto"
                whiteSpace="nowrap"
                borderRadius="md"
                borderWidth="1px"
                borderColor={borderColor}
              >
                <Table variant="simple" size={{ base: 'xs', sm: 'sm', md: 'md' }}>
                  <Thead>
                    <Tr>
                      <Th whiteSpace="nowrap" px={{ base: 2, md: 4 }} minW="120px">Vehículo</Th>
                      <Th whiteSpace="nowrap" display={{ base: 'none', md: 'table-cell' }} minW="140px">Conductor</Th>
                      <Th whiteSpace="nowrap" display={{ base: 'none', lg: 'table-cell' }} minW="100px">Fecha</Th>
                      <Th whiteSpace="nowrap" px={{ base: 2, md: 4 }} minW="100px">Kilometraje</Th>
                      <Th whiteSpace="nowrap" display={{ base: 'none', xl: 'table-cell' }} minW="100px">Diferencia</Th>
                      <Th whiteSpace="nowrap" display={{ base: 'none', xl: 'table-cell' }} minW="150px">Ruta</Th>
                      <Th whiteSpace="nowrap" display={{ base: 'none', lg: 'table-cell' }} minW="100px">Combustible</Th>
                      <Th whiteSpace="nowrap" px={{ base: 2, md: 4 }} minW="90px">Eficiencia</Th>
                      <Th whiteSpace="nowrap" display={{ base: 'none', sm: 'table-cell' }} minW="110px">Estado</Th>
                      <Th whiteSpace="nowrap" display={{ base: 'none', xl: 'table-cell' }} minW="140px">Registrado Por</Th>
                      <Th whiteSpace="nowrap" px={{ base: 2, md: 4 }} minW="100px">Acciones</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {paginatedRecords.map((record) => (
                      <Tr key={record.id} _hover={{ bg: tableRowHoverBg }}>
                        <Td px={{ base: 2, md: 4 }}>
                          <VStack spacing={0.5} align="start">
                            <Text 
                              fontWeight="bold" 
                              fontSize={{ base: 'xs', sm: 'sm' }} 
                              noOfLines={1}
                              minW={{ base: '80px', sm: '100px' }}
                            >
                              {record.vehiclePlate}
                            </Text>
                            <Text 
                              fontSize={{ base: '2xs', sm: 'xs' }} 
                              color={mutedTextColor} 
                              noOfLines={1}
                              display={{ base: 'none', sm: 'block' }}
                            >
                              {record.vehicleBrand}
                            </Text>
                          </VStack>
                        </Td>
                        
                        <Td display={{ base: 'none', md: 'table-cell' }}>
                          <Text 
                            fontSize={{ base: 'xs', sm: 'sm' }} 
                            noOfLines={1}
                            title={record.driver}
                          >
                            {record.driver}
                          </Text>
                        </Td>
                        
                        <Td display={{ base: 'none', lg: 'table-cell' }}>
                          <Text fontSize="sm" whiteSpace="nowrap">
                            {new Date(record.recordDate).toLocaleDateString()}
                          </Text>
                        </Td>
                        
                        <Td px={{ base: 2, md: 4 }}>
                          <VStack spacing={0.5} align="start">
                            <Text 
                              fontSize={{ base: 'xs', sm: 'sm' }} 
                              fontWeight="bold" 
                              whiteSpace="nowrap"
                            >
                              {record.currentMileage.toLocaleString()} km
                            </Text>
                            <Tooltip 
                              label={`Anterior: ${record.previousMileage.toLocaleString()} km`}
                              placement="top"
                              hasArrow
                              isDisabled={false} // Se deshabilita el tooltip para pantallas xl en el CSS
                              display={{ base: 'none', xl: 'block' }}
                            >
                              <Text 
                                fontSize={{ base: '2xs', sm: 'xs' }} 
                                color={mutedTextColor}
                                display={{ base: 'none', xl: 'block' }}
                                noOfLines={1}
                              >
                                Anterior: {record.previousMileage.toLocaleString()} km
                              </Text>
                            </Tooltip>
                          </VStack>
                        </Td>
                        
                        <Td display={{ base: 'none', xl: 'table-cell' }}>
                          <Text fontSize="sm" fontWeight="bold" color="blue.500" whiteSpace="nowrap">
                            +{record.difference} km
                          </Text>
                        </Td>
                        
                        <Td display={{ base: 'none', xl: 'table-cell' }}>
                          <Tooltip label={record.route} hasArrow placement="top">
                            <Text 
                              fontSize="sm" 
                              noOfLines={1} 
                              maxW="200px"
                              cursor="help"
                            >
                              {record.route}
                            </Text>
                          </Tooltip>
                        </Td>
                        
                        <Td display={{ base: 'none', lg: 'table-cell' }}>
                          <Text fontSize="sm" whiteSpace="nowrap">
                            {record.fuelConsumed.toFixed(1)} L
                          </Text>
                        </Td>
                        
                        <Td px={{ base: 2, md: 4 }}>
                          <Tooltip 
                            label={`${record.efficiency.toFixed(2)} km/l`} 
                            hasArrow 
                            placement="top"
                          >
                            <Box>
                              <Badge 
                                colorScheme={getEfficiencyColor(record.efficiency)} 
                                variant="subtle"
                                fontSize={{ base: '2xs', sm: 'xs' }}
                                py={1}
                                px={2}
                                w="100%"
                                textAlign="center"
                                whiteSpace="nowrap"
                                overflow="hidden"
                                textOverflow="ellipsis"
                              >
                                {record.efficiency.toFixed(2)} km/l
                              </Badge>
                            </Box>
                          </Tooltip>
                        </Td>
                        
                        <Td display={{ base: 'none', sm: 'table-cell' }}>
                          <Badge 
                            colorScheme={getStatusColor(record.status)} 
                            borderRadius="full"
                            fontSize={{ base: '2xs', sm: 'xs' }}
                            py={1}
                            px={2}
                          >
                            {getStatusText(record.status)}
                          </Badge>
                        </Td>
                        
                        <Td display={{ base: 'none', xl: 'table-cell' }}>
                          <Text fontSize="sm" noOfLines={1}>
                            {record.recordedBy}
                          </Text>
                        </Td>
                        
                        <Td px={{ base: 2, md: 4 }}>
                          <HStack spacing={{ base: 0, sm: 1 }}>
                            <IconButton
                              aria-label="Ver detalles"
                              icon={<Text>👁️</Text>}
                              size={{ base: 'xs', sm: 'sm' }}
                              variant="ghost"
                              onClick={() => handleEdit(record)}
                            />
                            <IconButton
                              aria-label="Modificar"
                              icon={<Text>✏️</Text>}
                              size={{ base: 'xs', sm: 'sm' }}
                              variant="ghost"
                              onClick={() => handleEdit(record)}
                            />
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>

            {/* Paginación */}
            {totalPages > 1 && (
              <Flex 
                justify="space-between" 
                align="center" 
                mt={4} 
                px={{ base: 4, md: 6 }}
                py={3}
                borderTop="1px solid"
                borderColor={borderColor}
                flexWrap="wrap"
                gap={2}
              >
                <Text fontSize={{ base: 'xs', sm: 'sm' }} color={mutedTextColor}>
                  Mostrando {Math.min(startIndex + 1, filteredRecords.length)}-{Math.min(startIndex + itemsPerPage, filteredRecords.length)} de {filteredRecords.length} registros
                </Text>
                
                <HStack spacing={2}>
                  <Button
                    size={{ base: 'xs', sm: 'sm' }}
                    onClick={() => setCurrentPage(1)}
                    isDisabled={currentPage === 1}
                    variant="outline"
                  >
                    Primera
                  </Button>
                  
                  <Button
                    size={{ base: 'xs', sm: 'sm' }}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    isDisabled={currentPage === 1}
                    leftIcon={<Text>←</Text>}
                    variant="outline"
                  >
                    <Text display={{ base: 'none', sm: 'block' }}>Anterior</Text>
                  </Button>
                  
                  <HStack spacing={1} display={{ base: 'none', sm: 'flex' }}>
                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                      // Mostrar páginas alrededor de la actual
                      let pageNum: number;
                      if (currentPage <= 2) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 1) {
                        pageNum = totalPages - 2 + i;
                      } else {
                        pageNum = currentPage - 1 + i;
                      }
                      
                      if (pageNum > 0 && pageNum <= totalPages) {
                        return (
                          <Button
                            key={pageNum}
                            size="xs"
                            variant={currentPage === pageNum ? 'solid' : 'outline'}
                            colorScheme={currentPage === pageNum ? 'blue' : 'gray'}
                            onClick={() => setCurrentPage(pageNum as number)}
                          >
                            {pageNum}
                          </Button>
                        );
                      }
                      return null;
                    })}
                    
                    {totalPages > 3 && currentPage < totalPages - 1 && (
                      <Text px={2}>...</Text>
                    )}
                    
                    {totalPages > 3 && currentPage < totalPages - 1 && (
                      <Button
                        size="xs"
                        variant={currentPage === totalPages ? 'solid' : 'outline'}
                        colorScheme={currentPage === totalPages ? 'blue' : 'gray'}
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    )}
                  </HStack>
                  
                  <Button
                    size={{ base: 'xs', sm: 'sm' }}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    isDisabled={currentPage === totalPages}
                    rightIcon={<Text>→</Text>}
                    variant="outline"
                  >
                    <Text display={{ base: 'none', sm: 'block' }}>Siguiente</Text>
                  </Button>
                  
                  <Button
                    size={{ base: 'xs', sm: 'sm' }}
                    onClick={() => setCurrentPage(totalPages)}
                    isDisabled={currentPage === totalPages}
                    variant="outline"
                  >
                    Última
                  </Button>
                </HStack>
              </Flex>
            )}
          </CardBody>
        </Card>
      </VStack>
      
      {/* Modal para ver/editar registro */}
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', md: 'xl' }} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent m={{ base: 0, md: 4 }} maxW={{ base: '100%', md: 'container.md' }} maxH={{ base: '100vh', md: '90vh' }}>
          <ModalHeader fontSize={{ base: 'lg', md: 'xl' }}>Modificar Registro de Kilometraje</ModalHeader>
          <ModalCloseButton size="lg" />
          <ModalBody pb={6}>
            <VStack spacing={4} align="stretch">
              <Alert status="info" borderRadius="md" variant="left-accent">
                <AlertIcon />
                <Box>
                  <AlertTitle fontSize={{ base: 'sm', md: 'md' }}>Solo Modificación</AlertTitle>
                  <AlertDescription fontSize={{ base: 'xs', md: 'sm' }}>
                    Los registros de kilometraje solo pueden ser modificados, no eliminados, para mantener la integridad de los datos históricos.
                  </AlertDescription>
                </Box>
              </Alert>

              <SimpleGrid 
                columns={{ base: 1, md: 2 }} 
                spacing={4} 
                w="full"
              >
                <FormControl>
                  <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Vehículo</FormLabel>
                  <Input 
                    value={selectedRecord?.vehiclePlate || ''} 
                    isReadOnly 
                    bg={inputReadOnlyBg}
                    size={{ base: 'sm', md: 'md' }}
                    fontSize={{ base: 'sm', md: 'md' }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Conductor</FormLabel>
                  <Input 
                    value={selectedRecord?.driver || ''} 
                    size={{ base: 'sm', md: 'md' }}
                    fontSize={{ base: 'sm', md: 'md' }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Fecha de Registro</FormLabel>
                  <Input 
                    type="date" 
                    value={selectedRecord?.recordDate || ''} 
                    size={{ base: 'sm', md: 'md' }}
                    fontSize={{ base: 'sm', md: 'md' }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Kilometraje Actual</FormLabel>
                  <Input 
                    type="number" 
                    value={selectedRecord?.currentMileage || ''} 
                    size={{ base: 'sm', md: 'md' }}
                    fontSize={{ base: 'sm', md: 'md' }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Combustible Consumido (L)</FormLabel>
                  <Input 
                    type="number" 
                    step="0.1" 
                    value={selectedRecord?.fuelConsumed || ''} 
                    size={{ base: 'sm', md: 'md' }}
                    fontSize={{ base: 'sm', md: 'md' }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Estado</FormLabel>
                  <Select 
                    value={selectedRecord?.status || ''}
                    size={{ base: 'sm', md: 'md' }}
                    fontSize={{ base: 'sm', md: 'md' }}
                  >
                    <option value="verified">Verificado</option>
                    <option value="pending">Pendiente</option>
                    <option value="flagged">Marcado</option>
                  </Select>
                </FormControl>
              </SimpleGrid>

              <FormControl>
                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Ruta</FormLabel>
                <Input 
                  value={selectedRecord?.route || ''} 
                  size={{ base: 'sm', md: 'md' }}
                  fontSize={{ base: 'sm', md: 'md' }}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize={{ base: 'sm', md: 'md' }}>Notas</FormLabel>
                <Textarea 
                  value={selectedRecord?.notes || ''} 
                  placeholder="Observaciones sobre el registro..." 
                  size={{ base: 'sm', md: 'md' }}
                  fontSize={{ base: 'sm', md: 'md' }}
                  minH="100px"
                />
              </FormControl>

              {selectedRecord && (
                <Card w="full" bg={statCardBg} variant="outline">
                  <CardBody p={{ base: 3, md: 4 }}>
                    <SimpleGrid 
                      columns={{ base: 1, sm: 3 }} 
                      spacing={{ base: 3, md: 4 }}
                    >
                      <Stat textAlign={{ base: 'center', sm: 'left' }}>
                        <StatLabel fontSize={{ base: 'xs', md: 'sm' }} color={mutedTextColor}>Diferencia</StatLabel>
                        <StatNumber fontSize={{ base: 'lg', md: 'xl' }} color="blue.500">
                          {selectedRecord.difference} km
                        </StatNumber>
                      </Stat>
                      
                      <Stat textAlign={{ base: 'center', sm: 'left' }}>
                        <StatLabel fontSize={{ base: 'xs', md: 'sm' }} color={mutedTextColor}>Eficiencia</StatLabel>
                        <StatNumber 
                          fontSize={{ base: 'lg', md: 'xl' }} 
                          color={`${getEfficiencyColor(selectedRecord.efficiency)}.500`}
                        >
                          {selectedRecord.efficiency.toFixed(2)} km/l
                        </StatNumber>
                      </Stat>
                      
                      <Stat textAlign={{ base: 'center', sm: 'left' }}>
                        <StatLabel fontSize={{ base: 'xs', md: 'sm' }} color={mutedTextColor}>Registrado Por</StatLabel>
                        <StatNumber fontSize={{ base: 'md', md: 'lg' }}>
                          {selectedRecord.recordedBy}
                        </StatNumber>
                      </Stat>
                    </SimpleGrid>
                  </CardBody>
                </Card>
              )}
            </VStack>
          </ModalBody>

          <ModalFooter 
            borderTopWidth="1px" 
            borderColor={borderColor}
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
          >
            <Button 
              variant="outline" 
              onClick={onClose}
              size={{ base: 'sm', md: 'md' }}
              flex={{ base: '1', md: '0 1 auto' }}
            >
              Cancelar
            </Button>
            
            <Button 
              colorScheme="blue" 
              onClick={handleSave}
              size={{ base: 'sm', md: 'md' }}
              flex={{ base: '1', md: '0 1 auto' }}
            >
              Guardar Cambios
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Mileage;
