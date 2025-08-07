import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Button,
  Input,
  Select,
  Switch,
  FormControl,
  FormLabel,
  FormHelperText,
  Textarea,
  useColorModeValue,
  SimpleGrid,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Avatar,
  AvatarGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const Settings: React.FC = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<any>(null);

  // Estados para configuraciones
  const [companySettings, setCompanySettings] = useState({
    name: 'FlotaAdmin Corp',
    address: 'Av. Principal 123, Panamá',
    phone: '+507 1234-5678',
    email: 'admin@flotaadmin.com',
    taxId: 'RUC-123456789-1-DV',
    logo: '',
  });

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    maintenanceAlerts: true,
    fuelAlerts: true,
    mileageAlerts: true,
    emailNotifications: true,
    smsNotifications: false,
    language: 'es',
    timezone: 'America/Panama',
    currency: 'USD',
    dateFormat: 'DD/MM/YYYY',
  });

  const [fuelSettings, setFuelSettings] = useState({
    dieselPrice: 1.20,
    gasolinePrice: 1.35,
    lowFuelThreshold: 25,
    highConsumptionThreshold: 15,
    efficiencyTarget: 6.0,
  });

  const [maintenanceSettings, setMaintenanceSettings] = useState({
    oilChangeInterval: 5000,
    generalInspectionInterval: 10000,
    tireChangeInterval: 50000,
    advanceNotificationDays: 7,
    overdueGraceDays: 3,
  });

  // Mock data para usuarios
  const mockUsers = [
    {
      id: 1,
      name: 'Admin Principal',
      email: 'admin@flotaadmin.com',
      role: 'Administrador',
      status: 'active',
      lastLogin: '2024-01-15 10:30',
      permissions: ['all'],
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      email: 'carlos@flotaadmin.com',
      role: 'Supervisor',
      status: 'active',
      lastLogin: '2024-01-14 16:45',
      permissions: ['vehicles', 'maintenance', 'reports'],
    },
    {
      id: 3,
      name: 'Ana López',
      email: 'ana@flotaadmin.com',
      role: 'Operador',
      status: 'active',
      lastLogin: '2024-01-14 08:20',
      permissions: ['vehicles', 'mileage'],
    },
    {
      id: 4,
      name: 'Pedro Ramírez',
      email: 'pedro@flotaadmin.com',
      role: 'Conductor',
      status: 'inactive',
      lastLogin: '2024-01-10 14:15',
      permissions: ['mileage'],
    },
  ];

  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');

  const handleSaveSettings = (section: string) => {
    toast({
      title: 'Configuración guardada',
      description: `La configuración de ${section} ha sido actualizada exitosamente.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUserEdit = (user: any) => {
    setSelectedUser(user);
    onOpen();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrador': return 'red';
      case 'Supervisor': return 'blue';
      case 'Operador': return 'green';
      case 'Conductor': return 'gray';
      default: return 'gray';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'green' : 'gray';
  };

  return (
    <Container maxW="full" p={8}>
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="lg" color={headingColor} mb={2}>
            ⚙️ Configuración del Sistema
          </Heading>
          <Text color={mutedTextColor}>
            Administra todas las configuraciones y parámetros del sistema FlotaAdmin
          </Text>
        </Box>

        {/* Tabs para diferentes secciones */}
        <Tabs variant="enclosed" colorScheme="blue" orientation="horizontal" isLazy>
          <Box overflowX="auto" pb={2}>
            <TabList minW="max-content" flexWrap="nowrap" whiteSpace="nowrap">
              <Tab fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} px={{ base: 2, sm: 4 }}>Empresa</Tab>
              <Tab fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} px={{ base: 2, sm: 4 }}>Sistema</Tab>
              <Tab fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} px={{ base: 2, sm: 4 }}>Combustible</Tab>
              <Tab fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} px={{ base: 2, sm: 4 }}>Mantenimiento</Tab>
              <Tab fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} px={{ base: 2, sm: 4 }}>Usuarios</Tab>
            </TabList>
          </Box>

          <TabPanels>
            {/* Tab 1: Configuración de Empresa */}
            <TabPanel p={0} pt={6}>
              <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md" color={headingColor}>Información de la Empresa</Heading>
                </CardHeader>
                <CardBody>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <FormControl>
                      <FormLabel>Nombre de la Empresa</FormLabel>
                      <Input
                        value={companySettings.name}
                        onChange={(e) => setCompanySettings({...companySettings, name: e.target.value})}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Teléfono</FormLabel>
                      <Input
                        value={companySettings.phone}
                        onChange={(e) => setCompanySettings({...companySettings, phone: e.target.value})}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        value={companySettings.email}
                        onChange={(e) => setCompanySettings({...companySettings, email: e.target.value})}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>RUC / ID Fiscal</FormLabel>
                      <Input
                        value={companySettings.taxId}
                        onChange={(e) => setCompanySettings({...companySettings, taxId: e.target.value})}
                      />
                    </FormControl>

                    <FormControl gridColumn={{ md: 'span 2' }}>
                      <FormLabel>Dirección</FormLabel>
                      <Textarea
                        value={companySettings.address}
                        onChange={(e) => setCompanySettings({...companySettings, address: e.target.value})}
                      />
                    </FormControl>
                  </SimpleGrid>

                  <Divider my={6} />

                  <Button colorScheme="blue" onClick={() => handleSaveSettings('empresa')}>
                    Guardar Configuración de Empresa
                  </Button>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Tab 2: Configuración del Sistema */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6}>
                {/* Configuraciones generales */}
                <Card bg={cardBg} border="1px solid" borderColor={borderColor} w="full">
                  <CardHeader>
                    <Heading size="md" color={headingColor}>Configuraciones Generales</Heading>
                  </CardHeader>
                  <CardBody>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                      <FormControl>
                        <FormLabel>Idioma del Sistema</FormLabel>
                        <Select
                          value={systemSettings.language}
                          onChange={(e) => setSystemSettings({...systemSettings, language: e.target.value})}
                        >
                          <option value="es">Español</option>
                          <option value="en">English</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Zona Horaria</FormLabel>
                        <Select
                          value={systemSettings.timezone}
                          onChange={(e) => setSystemSettings({...systemSettings, timezone: e.target.value})}
                        >
                          <option value="America/Panama">Panamá (GMT-5)</option>
                          <option value="America/Costa_Rica">Costa Rica (GMT-6)</option>
                          <option value="America/Guayaquil">Ecuador (GMT-5)</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Moneda</FormLabel>
                        <Select
                          value={systemSettings.currency}
                          onChange={(e) => setSystemSettings({...systemSettings, currency: e.target.value})}
                        >
                          <option value="USD">USD - Dólar Americano</option>
                          <option value="PAB">PAB - Balboa Panameño</option>
                          <option value="CRC">CRC - Colón Costarricense</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel>Formato de Fecha</FormLabel>
                        <Select
                          value={systemSettings.dateFormat}
                          onChange={(e) => setSystemSettings({...systemSettings, dateFormat: e.target.value})}
                        >
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </Select>
                      </FormControl>
                    </SimpleGrid>
                  </CardBody>
                </Card>

                {/* Notificaciones */}
                <Card bg={cardBg} border="1px solid" borderColor={borderColor} w="full">
                  <CardHeader>
                    <Heading size="md" color={headingColor}>Notificaciones</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <HStack justify="space-between">
                        <Box>
                          <Text fontWeight="bold">Alertas de Mantenimiento</Text>
                          <Text fontSize="sm" color={mutedTextColor}>Recibir notificaciones sobre mantenimientos vencidos</Text>
                        </Box>
                        <Switch
                          isChecked={systemSettings.maintenanceAlerts}
                          onChange={(e) => setSystemSettings({...systemSettings, maintenanceAlerts: e.target.checked})}
                          colorScheme="blue"
                        />
                      </HStack>

                      <HStack justify="space-between">
                        <Box>
                          <Text fontWeight="bold">Alertas de Combustible</Text>
                          <Text fontSize="sm" color={mutedTextColor}>Notificaciones sobre consumo elevado de combustible</Text>
                        </Box>
                        <Switch
                          isChecked={systemSettings.fuelAlerts}
                          onChange={(e) => setSystemSettings({...systemSettings, fuelAlerts: e.target.checked})}
                          colorScheme="blue"
                        />
                      </HStack>

                      <HStack justify="space-between">
                        <Box>
                          <Text fontWeight="bold">Alertas de Kilometraje</Text>
                          <Text fontSize="sm" color={mutedTextColor}>Notificaciones sobre registros de kilometraje pendientes</Text>
                        </Box>
                        <Switch
                          isChecked={systemSettings.mileageAlerts}
                          onChange={(e) => setSystemSettings({...systemSettings, mileageAlerts: e.target.checked})}
                          colorScheme="blue"
                        />
                      </HStack>

                      <HStack justify="space-between">
                        <Box>
                          <Text fontWeight="bold">Notificaciones por Email</Text>
                          <Text fontSize="sm" color={mutedTextColor}>Enviar notificaciones por correo electrónico</Text>
                        </Box>
                        <Switch
                          isChecked={systemSettings.emailNotifications}
                          onChange={(e) => setSystemSettings({...systemSettings, emailNotifications: e.target.checked})}
                          colorScheme="blue"
                        />
                      </HStack>

                      <HStack justify="space-between">
                        <Box>
                          <Text fontWeight="bold">Notificaciones por SMS</Text>
                          <Text fontSize="sm" color={mutedTextColor}>Enviar notificaciones por mensaje de texto</Text>
                        </Box>
                        <Switch
                          isChecked={systemSettings.smsNotifications}
                          onChange={(e) => setSystemSettings({...systemSettings, smsNotifications: e.target.checked})}
                          colorScheme="blue"
                        />
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Respaldos */}
                <Card bg={cardBg} border="1px solid" borderColor={borderColor} w="full">
                  <CardHeader>
                    <Heading size="md" color={headingColor}>Respaldos Automáticos</Heading>
                  </CardHeader>
                  <CardBody>
                    <VStack spacing={4} align="stretch">
                      <HStack justify="space-between">
                        <Box>
                          <Text fontWeight="bold">Respaldo Automático</Text>
                          <Text fontSize="sm" color={mutedTextColor}>Crear respaldos automáticos de la base de datos</Text>
                        </Box>
                        <Switch
                          isChecked={systemSettings.autoBackup}
                          onChange={(e) => setSystemSettings({...systemSettings, autoBackup: e.target.checked})}
                          colorScheme="blue"
                        />
                      </HStack>

                      {systemSettings.autoBackup && (
                        <FormControl>
                          <FormLabel>Frecuencia de Respaldo</FormLabel>
                          <Select
                            value={systemSettings.backupFrequency}
                            onChange={(e) => setSystemSettings({...systemSettings, backupFrequency: e.target.value})}
                          >
                            <option value="daily">Diario</option>
                            <option value="weekly">Semanal</option>
                            <option value="monthly">Mensual</option>
                          </Select>
                          <FormHelperText>Los respaldos se realizarán automáticamente según la frecuencia seleccionada</FormHelperText>
                        </FormControl>
                      )}
                    </VStack>
                  </CardBody>
                </Card>

                <Button colorScheme="blue" onClick={() => handleSaveSettings('sistema')}>
                  Guardar Configuración del Sistema
                </Button>
              </VStack>
            </TabPanel>

            {/* Tab 3: Configuración de Combustible */}
            <TabPanel p={0} pt={6}>
              <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md" color={headingColor}>Parámetros de Combustible</Heading>
                </CardHeader>
                <CardBody>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <FormControl>
                      <FormLabel>Precio del Diesel (por litro)</FormLabel>
                      <Input
                        type="number"
                        step="0.01"
                        value={fuelSettings.dieselPrice}
                        onChange={(e) => setFuelSettings({...fuelSettings, dieselPrice: parseFloat(e.target.value)})}
                      />
                      <FormHelperText>Precio actual del diesel en {systemSettings.currency}</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Precio de la Gasolina (por litro)</FormLabel>
                      <Input
                        type="number"
                        step="0.01"
                        value={fuelSettings.gasolinePrice}
                        onChange={(e) => setFuelSettings({...fuelSettings, gasolinePrice: parseFloat(e.target.value)})}
                      />
                      <FormHelperText>Precio actual de la gasolina en {systemSettings.currency}</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Umbral de Combustible Bajo (%)</FormLabel>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={fuelSettings.lowFuelThreshold}
                        onChange={(e) => setFuelSettings({...fuelSettings, lowFuelThreshold: parseInt(e.target.value)})}
                      />
                      <FormHelperText>Porcentaje mínimo para alertas de combustible bajo</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Umbral de Alto Consumo (L/100km)</FormLabel>
                      <Input
                        type="number"
                        step="0.1"
                        value={fuelSettings.highConsumptionThreshold}
                        onChange={(e) => setFuelSettings({...fuelSettings, highConsumptionThreshold: parseFloat(e.target.value)})}
                      />
                      <FormHelperText>Consumo máximo antes de generar alerta</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Meta de Eficiencia (km/l)</FormLabel>
                      <Input
                        type="number"
                        step="0.1"
                        value={fuelSettings.efficiencyTarget}
                        onChange={(e) => setFuelSettings({...fuelSettings, efficiencyTarget: parseFloat(e.target.value)})}
                      />
                      <FormHelperText>Eficiencia objetivo para la flota</FormHelperText>
                    </FormControl>
                  </SimpleGrid>

                  <Divider my={6} />

                  <Button colorScheme="blue" onClick={() => handleSaveSettings('combustible')}>
                    Guardar Configuración de Combustible
                  </Button>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Tab 4: Configuración de Mantenimiento */}
            <TabPanel p={0} pt={6}>
              <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
                <CardHeader>
                  <Heading size="md" color={headingColor}>Intervalos de Mantenimiento</Heading>
                </CardHeader>
                <CardBody>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    <FormControl>
                      <FormLabel>Intervalo de Cambio de Aceite (km)</FormLabel>
                      <Input
                        type="number"
                        value={maintenanceSettings.oilChangeInterval}
                        onChange={(e) => setMaintenanceSettings({...maintenanceSettings, oilChangeInterval: parseInt(e.target.value)})}
                      />
                      <FormHelperText>Kilómetros entre cambios de aceite</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Intervalo de Inspección General (km)</FormLabel>
                      <Input
                        type="number"
                        value={maintenanceSettings.generalInspectionInterval}
                        onChange={(e) => setMaintenanceSettings({...maintenanceSettings, generalInspectionInterval: parseInt(e.target.value)})}
                      />
                      <FormHelperText>Kilómetros entre inspecciones generales</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Intervalo de Cambio de Llantas (km)</FormLabel>
                      <Input
                        type="number"
                        value={maintenanceSettings.tireChangeInterval}
                        onChange={(e) => setMaintenanceSettings({...maintenanceSettings, tireChangeInterval: parseInt(e.target.value)})}
                      />
                      <FormHelperText>Kilómetros entre cambios de llantas</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Días de Notificación Anticipada</FormLabel>
                      <Input
                        type="number"
                        min="1"
                        max="30"
                        value={maintenanceSettings.advanceNotificationDays}
                        onChange={(e) => setMaintenanceSettings({...maintenanceSettings, advanceNotificationDays: parseInt(e.target.value)})}
                      />
                      <FormHelperText>Días antes del vencimiento para enviar alertas</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel>Días de Gracia por Vencimiento</FormLabel>
                      <Input
                        type="number"
                        min="0"
                        max="15"
                        value={maintenanceSettings.overdueGraceDays}
                        onChange={(e) => setMaintenanceSettings({...maintenanceSettings, overdueGraceDays: parseInt(e.target.value)})}
                      />
                      <FormHelperText>Días de gracia después del vencimiento</FormHelperText>
                    </FormControl>
                  </SimpleGrid>

                  <Divider my={6} />

                  <Button colorScheme="blue" onClick={() => handleSaveSettings('mantenimiento')}>
                    Guardar Configuración de Mantenimiento
                  </Button>
                </CardBody>
              </Card>
            </TabPanel>

            {/* Tab 5: Gestión de Usuarios */}
            <TabPanel p={0} pt={6}>
              <VStack spacing={6}>
                <Card bg={cardBg} border="1px solid" borderColor={borderColor} w="full">
                  <CardHeader>
                    <HStack justify="space-between">
                      <Heading size="md" color={headingColor}>Usuarios del Sistema</Heading>
                      <Button colorScheme="blue" size="sm">
                        Agregar Usuario
                      </Button>
                    </HStack>
                  </CardHeader>
                  <CardBody>
                    <TableContainer overflowX="auto" whiteSpace="nowrap" maxW="100vw">
                      <Table variant="simple" size="sm">
                        <Thead>
                          <Tr>
                            <Th>Usuario</Th>
                            <Th display={{ base: 'none', md: 'table-cell' }}>Email</Th>
                            <Th>Rol</Th>
                            <Th display={{ base: 'none', sm: 'table-cell' }}>Estado</Th>
                            <Th display={{ base: 'none', lg: 'table-cell' }}>Último Acceso</Th>
                            <Th>Acciones</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {mockUsers.map((user) => (
                            <Tr key={user.id}>
                              <Td>
                                <HStack spacing={2}>
                                  <Avatar size="xs" name={user.name} display={{ base: 'none', sm: 'flex' }} />
                                  <Box>
                                    <Text fontWeight="bold" fontSize={{ base: 'xs', sm: 'sm' }} noOfLines={1}>
                                      {user.name}
                                    </Text>
                                    <Text fontSize="xs" color={mutedTextColor} display={{ base: 'block', md: 'none' }} noOfLines={1}>
                                      {user.email}
                                    </Text>
                                  </Box>
                                </HStack>
                              </Td>
                              <Td display={{ base: 'none', md: 'table-cell' }}>
                                <Text fontSize="sm" noOfLines={1} maxW="200px">
                                  {user.email}
                                </Text>
                              </Td>
                              <Td>
                                <Badge 
                                  colorScheme={getRoleColor(user.role)}
                                  fontSize={{ base: '2xs', sm: 'xs' }}
                                  whiteSpace="normal"
                                  textAlign="center"
                                  lineHeight="tall"
                                >
                                  {user.role}
                                </Badge>
                              </Td>
                              <Td display={{ base: 'none', sm: 'table-cell' }}>
                                <Badge 
                                  colorScheme={getStatusColor(user.status)}
                                  fontSize={{ base: '2xs', sm: 'xs' }}
                                >
                                  {user.status === 'active' ? 'Activo' : 'Inactivo'}
                                </Badge>
                              </Td>
                              <Td display={{ base: 'none', lg: 'table-cell' }}>
                                <Text fontSize="xs" color={mutedTextColor}>
                                  {user.lastLogin}
                                </Text>
                              </Td>
                              <Td>
                                <HStack spacing={{ base: 0.5, sm: 1 }}>
                                  <IconButton
                                    aria-label="Editar usuario"
                                    icon={<Text fontSize={{ base: 'xs', sm: 'sm' }}>✏️</Text>}
                                    size={{ base: 'xs', sm: 'sm' }}
                                    variant="ghost"
                                    onClick={() => handleUserEdit(user)}
                                  />
                                  <IconButton
                                    aria-label="Ver permisos"
                                    icon={<Text fontSize={{ base: 'xs', sm: 'sm' }}>🔒</Text>}
                                    size={{ base: 'xs', sm: 'sm' }}
                                    variant="ghost"
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

                {/* Estadísticas de usuarios */}
                <SimpleGrid 
                  columns={{ base: 2, md: 4 }} 
                  spacing={{ base: 2, md: 4 }} 
                  w="full"
                  overflowX="auto"
                  sx={{
                    '&::-webkit-scrollbar': {
                      display: 'none',
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                  minChildWidth="150px"
                >
                  <Card bg={cardBg} border="1px solid" borderColor={borderColor} minW={{ base: '120px', sm: 'auto' }}>
                    <CardBody textAlign="center" p={{ base: 2, md: 4 }}>
                      <Text fontSize={{ base: 'xl', sm: '2xl' }} fontWeight="bold" color="blue.500">
                        {mockUsers.length}
                      </Text>
                      <Text fontSize={{ base: 'xs', sm: 'sm' }} color={mutedTextColor}>Total Usuarios</Text>
                    </CardBody>
                  </Card>
                  <Card bg={cardBg} border="1px solid" borderColor={borderColor} minW={{ base: '120px', sm: 'auto' }}>
                    <CardBody textAlign="center" p={{ base: 2, md: 4 }}>
                      <Text fontSize={{ base: 'xl', sm: '2xl' }} fontWeight="bold" color="green.500">
                        {mockUsers.filter(u => u.status === 'active').length}
                      </Text>
                      <Text fontSize={{ base: 'xs', sm: 'sm' }} color={mutedTextColor}>Usuarios Activos</Text>
                    </CardBody>
                  </Card>
                  <Card bg={cardBg} border="1px solid" borderColor={borderColor} minW={{ base: '120px', sm: 'auto' }}>
                    <CardBody textAlign="center" p={{ base: 2, md: 4 }}>
                      <Text fontSize={{ base: 'xl', sm: '2xl' }} fontWeight="bold" color="red.500">
                        {mockUsers.filter(u => u.role === 'Administrador').length}
                      </Text>
                      <Text fontSize={{ base: 'xs', sm: 'sm' }} color={mutedTextColor}>Administradores</Text>
                    </CardBody>
                  </Card>
                  <Card bg={cardBg} border="1px solid" borderColor={borderColor} minW={{ base: '120px', sm: 'auto' }}>
                    <CardBody textAlign="center" p={{ base: 2, md: 4 }}>
                      <Text fontSize={{ base: 'xl', sm: '2xl' }} fontWeight="bold" color="purple.500">
                        {mockUsers.filter(u => u.role === 'Conductor').length}
                      </Text>
                      <Text fontSize={{ base: 'xs', sm: 'sm' }} color={mutedTextColor}>Conductores</Text>
                    </CardBody>
                  </Card>
                </SimpleGrid>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>

      {/* Modal para editar usuario */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedUser && (
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Nombre Completo</FormLabel>
                  <Input defaultValue={selectedUser.name} />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" defaultValue={selectedUser.email} />
                </FormControl>
                <FormControl>
                  <FormLabel>Rol</FormLabel>
                  <Select defaultValue={selectedUser.role}>
                    <option value="Administrador">Administrador</option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Operador">Operador</option>
                    <option value="Conductor">Conductor</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Estado</FormLabel>
                  <Select defaultValue={selectedUser.status}>
                    <option value="active">Activo</option>
                    <option value="inactive">Inactivo</option>
                  </Select>
                </FormControl>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Guardar Cambios
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Settings;
