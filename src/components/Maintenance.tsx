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
  Switch,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

// Mock data para mantenimientos
const mockMaintenanceRecords = [
  {
    id: 1,
    vehiclePlate: 'ABC-123',
    vehicleBrand: 'Volvo FH16',
    type: 'Cambio de aceite',
    status: 'completed', // completed, scheduled, overdue
    scheduledDate: '2024-01-15',
    completedDate: '2024-01-15',
    nextDue: '2024-04-15',
    mileage: 45000,
    cost: 150.00,
    description: 'Cambio de aceite motor y filtro',
    technician: 'Juan Pérez',
    workshop: 'Taller Central',
    priority: 'normal', // low, normal, high, urgent
    isFuture: false,
  },
  {
    id: 2,
    vehiclePlate: 'DEF-456',
    vehicleBrand: 'Mercedes Actros',
    type: 'Revisión general',
    status: 'scheduled',
    scheduledDate: '2024-02-10',
    completedDate: null,
    nextDue: null,
    mileage: 52000,
    cost: 300.00,
    description: 'Revisión completa del sistema de frenos y suspensión',
    technician: 'Carlos Mendoza',
    workshop: 'Taller Norte',
    priority: 'high',
    isFuture: true,
  },
  {
    id: 3,
    vehiclePlate: 'GHI-789',
    vehicleBrand: 'Ford Transit',
    type: 'Cambio de llantas',
    status: 'overdue',
    scheduledDate: '2024-01-20',
    completedDate: null,
    nextDue: null,
    mileage: 89000,
    cost: 400.00,
    description: 'Cambio de 4 llantas traseras',
    technician: 'Ana López',
    workshop: 'Taller Sur',
    priority: 'urgent',
    isFuture: false,
  },
  {
    id: 4,
    vehiclePlate: 'ABC-123',
    vehicleBrand: 'Volvo FH16',
    type: 'Mantenimiento preventivo',
    status: 'scheduled',
    scheduledDate: '2024-03-01',
    completedDate: null,
    nextDue: null,
    mileage: 47000,
    cost: 250.00,
    description: 'Mantenimiento preventivo programado - Revisión de motor y transmisión',
    technician: 'Pedro Ramírez',
    workshop: 'Taller Central',
    priority: 'normal',
    isFuture: true,
  },
];

const Maintenance: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCurrentMaintenance, setIsCurrentMaintenance] = useState(false);
  const [showFutureOnly, setShowFutureOnly] = useState(false);
  const itemsPerPage = 10;

  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');

  // Filtrar registros
  const filteredRecords = mockMaintenanceRecords.filter(record => {
    const matchesSearch = record.vehiclePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.vehicleBrand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || record.priority === priorityFilter;
    const matchesFuture = !showFutureOnly || record.isFuture;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesFuture;
  });

  // Paginación
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRecords = filteredRecords.slice(startIndex, startIndex + itemsPerPage);

  // Estadísticas
  const stats = {
    total: mockMaintenanceRecords.length,
    completed: mockMaintenanceRecords.filter(r => r.status === 'completed').length,
    scheduled: mockMaintenanceRecords.filter(r => r.status === 'scheduled').length,
    overdue: mockMaintenanceRecords.filter(r => r.status === 'overdue').length,
    future: mockMaintenanceRecords.filter(r => r.isFuture).length,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'green';
      case 'scheduled': return 'blue';
      case 'overdue': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'scheduled': return 'Programado';
      case 'overdue': return 'Vencido';
      default: return 'Desconocido';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'red';
      case 'high': return 'orange';
      case 'normal': return 'blue';
      case 'low': return 'gray';
      default: return 'gray';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'Urgente';
      case 'high': return 'Alta';
      case 'normal': return 'Normal';
      case 'low': return 'Baja';
      default: return 'Normal';
    }
  };

  const handleEdit = (record: any) => {
    setSelectedRecord(record);
    setIsEditing(true);
    onOpen();
  };

  const handleAddFuture = () => {
    setSelectedRecord(null);
    setIsEditing(false);
    setIsCurrentMaintenance(false);
    onOpen();
  };

  const handleSave = () => {
    let title, description;
    
    if (isEditing) {
      title = 'Registro actualizado';
      description = 'El registro de mantenimiento ha sido actualizado exitosamente.';
    } else if (isCurrentMaintenance) {
      title = 'Mantenimiento registrado';
      description = 'El mantenimiento actual ha sido registrado exitosamente.';
    } else {
      title = 'Mantenimiento programado';
      description = 'El mantenimiento futuro ha sido programado exitosamente.';
    }
    
    toast({
      title,
      description,
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
            🔧 Gestión de Mantenimiento
          </Heading>
          <Text color={mutedTextColor}>
            Administra y programa el mantenimiento de toda tu flota vehicular
          </Text>
        </Box>

        {/* Estadísticas */}
        <SimpleGrid columns={{ base: 2, md: 5 }} spacing={4}>
          <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel color={mutedTextColor} fontSize="sm">Total</StatLabel>
                <StatNumber color="blue.500" fontSize="2xl">{stats.total}</StatNumber>
                <StatHelpText>Registros</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
          
          <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel color={mutedTextColor} fontSize="sm">Completados</StatLabel>
                <StatNumber color="green.500" fontSize="2xl">{stats.completed}</StatNumber>
                <StatHelpText>Realizados</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel color={mutedTextColor} fontSize="sm">Programados</StatLabel>
                <StatNumber color="blue.500" fontSize="2xl">{stats.scheduled}</StatNumber>
                <StatHelpText>Pendientes</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel color={mutedTextColor} fontSize="sm">Vencidos</StatLabel>
                <StatNumber color="red.500" fontSize="2xl">{stats.overdue}</StatNumber>
                <StatHelpText>Urgentes</StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
            <CardBody>
              <Stat>
                <StatLabel color={mutedTextColor} fontSize="sm">Futuros</StatLabel>
                <StatNumber color="purple.500" fontSize="2xl">{stats.future}</StatNumber>
                <StatHelpText>Programados</StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Controles */}
        <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
          <CardBody>
            <Flex direction={{ base: 'column', md: 'row' }} gap={4} align={{ md: 'center' }} justify="space-between">
              {/* Filtros - Móvil */}
              <VStack spacing={3} align="stretch" flex={1} display={{ base: 'flex', md: 'none' }}>
                <SimpleGrid columns={2} spacing={2}>
                  <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} size="sm">
                    <option value="all">Todos</option>
                    <option value="completed">Completados</option>
                    <option value="scheduled">Programados</option>
                    <option value="overdue">Vencidos</option>
                  </Select>
                  <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} size="sm">
                    <option value="all">Todas</option>
                    <option value="urgent">Urgente</option>
                    <option value="high">Alta</option>
                    <option value="normal">Normal</option>
                    <option value="low">Baja</option>
                  </Select>
                </SimpleGrid>
                <HStack>
                  <Switch
                    isChecked={showFutureOnly}
                    onChange={(e) => setShowFutureOnly(e.target.checked)}
                    size="sm"
                  />
                  <Text fontSize="sm">Solo futuros</Text>
                </HStack>
              </VStack>
              
              {/* Filtros - Desktop */}
              <HStack spacing={4} flex={1} display={{ base: 'none', md: 'flex' }}>
                <InputGroup maxW="300px">
                  <InputLeftElement>
                    <Text color={mutedTextColor}>🔍</Text>
                  </InputLeftElement>
                  <Input
                    placeholder="Buscar por placa, tipo o marca..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>

                <Select maxW="150px" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="all">Todos los estados</option>
                  <option value="completed">Completados</option>
                  <option value="scheduled">Programados</option>
                  <option value="overdue">Vencidos</option>
                </Select>

                <Select maxW="150px" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                  <option value="all">Todas las prioridades</option>
                  <option value="urgent">Urgente</option>
                  <option value="high">Alta</option>
                  <option value="normal">Normal</option>
                  <option value="low">Baja</option>
                </Select>

                <HStack>
                  <Text fontSize="sm" color={mutedTextColor}>Solo futuros:</Text>
                  <Switch
                    isChecked={showFutureOnly}
                    onChange={(e) => setShowFutureOnly(e.target.checked)}
                    colorScheme="purple"
                  />
                </HStack>
              </HStack>

              {/* Botones de acción */}
              <HStack spacing={3}>
                <Button colorScheme="green" leftIcon={<Text>🔧</Text>} onClick={() => {
                  setSelectedRecord(null);
                  setIsEditing(false);
                  setIsCurrentMaintenance(true);
                  onOpen();
                }}>
                  Registrar Mantenimiento Actual
                </Button>
                <Button colorScheme="blue" leftIcon={<Text>📅</Text>} onClick={handleAddFuture}>
                  Programar Mantenimiento Futuro
                </Button>
              </HStack>
            </Flex>
          </CardBody>
        </Card>

        {/* Alerta para mantenimientos futuros */}
        {showFutureOnly && (
          <Alert status="info" borderRadius="lg">
            <AlertIcon />
            <Box>
              <AlertTitle>Vista de Mantenimientos Futuros</AlertTitle>
              <AlertDescription>
                Mostrando solo los mantenimientos programados para el futuro. Estos pueden ser modificados antes de su ejecución.
              </AlertDescription>
            </Box>
          </Alert>
        )}

        {/* Tabla de mantenimientos */}
        <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
          <CardBody>
            <TableContainer>
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Vehículo</Th>
                    <Th>Tipo de Mantenimiento</Th>
                    <Th>Estado</Th>
                    <Th>Prioridad</Th>
                    <Th>Fecha Programada</Th>
                    <Th>Fecha Completada</Th>
                    <Th>Kilometraje</Th>
                    <Th>Costo</Th>
                    <Th>Taller</Th>
                    <Th>Acciones</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {paginatedRecords.map((record) => (
                    <Tr key={record.id}>
                      <Td>
                        <VStack spacing={0} align="start">
                          <Text fontWeight="bold" fontSize="sm">{record.vehiclePlate}</Text>
                          <Text fontSize="xs" color={mutedTextColor}>{record.vehicleBrand}</Text>
                          {record.isFuture && (
                            <Badge colorScheme="purple" size="sm">Futuro</Badge>
                          )}
                        </VStack>
                      </Td>
                      <Td>
                        <Text fontSize="sm">{record.type}</Text>
                      </Td>
                      <Td>
                        <Badge colorScheme={getStatusColor(record.status)} borderRadius="full">
                          {getStatusText(record.status)}
                        </Badge>
                      </Td>
                      <Td>
                        <Badge colorScheme={getPriorityColor(record.priority)} variant="outline">
                          {getPriorityText(record.priority)}
                        </Badge>
                      </Td>
                      <Td>
                        <Text fontSize="sm">{record.scheduledDate}</Text>
                      </Td>
                      <Td>
                        <Text fontSize="sm" color={record.completedDate ? textColor : mutedTextColor}>
                          {record.completedDate || 'Pendiente'}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="sm">{record.mileage.toLocaleString()} km</Text>
                      </Td>
                      <Td>
                        <Text fontSize="sm" fontWeight="bold" color="green.500">
                          ${record.cost.toFixed(2)}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="sm">{record.workshop}</Text>
                      </Td>
                      <Td>
                        <HStack spacing={1}>
                          <IconButton
                            aria-label="Ver detalles"
                            icon={<Text fontSize="sm">👁️</Text>}
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(record)}
                          />
                          <IconButton
                            aria-label="Modificar"
                            icon={<Text fontSize="sm">✏️</Text>}
                            size="sm"
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

            {/* Paginación */}
            {totalPages > 1 && (
              <Flex justify="center" align="center" mt={6} gap={2}>
                <Button
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  isDisabled={currentPage === 1}
                >
                  Anterior
                </Button>
                
                <Text fontSize="sm" color={mutedTextColor}>
                  Página {currentPage} de {totalPages}
                </Text>
                
                <Button
                  size="sm"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  isDisabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </Flex>
            )}
          </CardBody>
        </Card>
      </VStack>

      {/* Modal para editar/agregar mantenimiento */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {isEditing ? 'Modificar Registro de Mantenimiento' : 
             isCurrentMaintenance ? 'Registrar Mantenimiento Actual' : 'Programar Mantenimiento Futuro'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {!isEditing && (
                <Alert status={isCurrentMaintenance ? "success" : "info"} borderRadius="md">
                  <AlertIcon />
                  <Box>
                    <AlertTitle fontSize="sm">
                      {isCurrentMaintenance ? 'Mantenimiento Actual' : 'Mantenimiento Futuro'}
                    </AlertTitle>
                    <AlertDescription fontSize="sm">
                      {isCurrentMaintenance ? 
                        'Este mantenimiento se registrará como realizado o en curso actualmente.' :
                        'Este mantenimiento será marcado como "futuro" para diferenciarlo de los registros históricos.'}
                    </AlertDescription>
                  </Box>
                </Alert>
              )}

              <FormControl>
                <FormLabel>Vehículo</FormLabel>
                <Select placeholder="Seleccionar vehículo">
                  <option value="ABC-123">ABC-123 - Volvo FH16</option>
                  <option value="DEF-456">DEF-456 - Mercedes Actros</option>
                  <option value="GHI-789">GHI-789 - Ford Transit</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Tipo de Mantenimiento</FormLabel>
                <Select placeholder="Seleccionar tipo">
                  <option value="Cambio de aceite">Cambio de aceite</option>
                  <option value="Revisión general">Revisión general</option>
                  <option value="Cambio de llantas">Cambio de llantas</option>
                  <option value="Mantenimiento preventivo">Mantenimiento preventivo</option>
                  <option value="Reparación de motor">Reparación de motor</option>
                  <option value="Sistema de frenos">Sistema de frenos</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>
                  {isCurrentMaintenance ? 'Fecha de Realización' : 'Fecha Programada'}
                </FormLabel>
                <Input type="date" defaultValue={isCurrentMaintenance ? new Date().toISOString().split('T')[0] : ''} />
              </FormControl>

              {isCurrentMaintenance && (
                <FormControl>
                  <FormLabel>Estado del Mantenimiento</FormLabel>
                  <Select defaultValue="completed">
                    <option value="completed">Completado</option>
                    <option value="in-progress">En Progreso</option>
                  </Select>
                </FormControl>
              )}

              <FormControl>
                <FormLabel>Prioridad</FormLabel>
                <Select>
                  <option value="low">Baja</option>
                  <option value="normal">Normal</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Kilometraje Estimado</FormLabel>
                <Input type="number" placeholder="Ej: 50000" />
              </FormControl>

              <FormControl>
                <FormLabel>Costo Estimado</FormLabel>
                <Input type="number" placeholder="Ej: 250.00" />
              </FormControl>

              <FormControl>
                <FormLabel>Taller</FormLabel>
                <Select>
                  <option value="Taller Central">Taller Central</option>
                  <option value="Taller Norte">Taller Norte</option>
                  <option value="Taller Sur">Taller Sur</option>
                  <option value="Taller Externo">Taller Externo</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Descripción</FormLabel>
                <Textarea placeholder="Descripción detallada del mantenimiento..." />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              {isEditing ? 'Guardar Cambios' : 
               isCurrentMaintenance ? 'Registrar Mantenimiento' : 'Programar Mantenimiento'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Maintenance;
