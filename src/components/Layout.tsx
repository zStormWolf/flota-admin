import React, { useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  HStack,
  useColorModeValue,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  VStack,
  Divider,
} from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ThemeSelector from './ThemeSelector';
import UserProfile from './UserProfile';
import UserAvatar from './UserAvatar';
import Vehicles from './Vehicles';
import VehicleDetails from './VehicleDetails';
import VehicleEdit from './VehicleEdit';
import Maintenance from './Maintenance';
import Mileage from './Mileage';
import Consumption from './Consumption';
import Settings from './Settings';
import { useUser } from '../contexts/UserContext';

interface LayoutProps {
  initialSection?: string;
}

const Layout: React.FC<LayoutProps> = ({ initialSection }) => {
  // Cargar sección activa desde initialSection, localStorage o usar 'dashboard' por defecto
  const [activeSection, setActiveSection] = useState(() => {
    return initialSection || localStorage.getItem('flota-admin-active-section') || 'dashboard';
  });
  
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  
  // Cargar estado del sidebar desde localStorage
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('flota-admin-sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  
  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? false;
  const { user } = useUser();
  
  // Color mode values
  const topBarBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const mainBg = useColorModeValue('gray.50', 'gray.900');
  const logoColor = useColorModeValue('gray.700', 'gray.200');
  const userSubtextColor = useColorModeValue('gray.500', 'gray.400');

  // Función para cambiar sección y guardar en localStorage
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    localStorage.setItem('flota-admin-active-section', section);
  };

  // Función para alternar sidebar y guardar en localStorage
  const handleSidebarToggle = () => {
    const newState = !sidebarCollapsed;
    setSidebarCollapsed(newState);
    localStorage.setItem('flota-admin-sidebar-collapsed', JSON.stringify(newState));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'vehicles':
        return <Vehicles />;
      case 'vehicle-details':
        return <VehicleDetails vehicleId="ABC-123" onBack={() => handleSectionChange('vehicles')} onEdit={() => handleSectionChange('vehicle-edit')} />;
      case 'vehicle-edit':
        return <VehicleEdit vehicleId="ABC-123" onBack={() => handleSectionChange('vehicle-details')} onSave={() => handleSectionChange('vehicle-details')} />;
      case 'maintenance':
        return <Maintenance />;
      case 'mileage':
        return <Mileage />;
      case 'consumption':
        return <Consumption />;
      case 'settings':
        return <Settings />;
      case 'damages':
        return (
          <Box p={8}>
            <Box textAlign="center" py={20}>
              <Box fontSize="6xl" mb={4}>⚠️</Box>
              <Box fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
                Daños de Vehículos
              </Box>
              <Box color="gray.500">
                Sección en desarrollo - Aquí se mostrarán los reportes de daños
              </Box>
            </Box>
          </Box>
        );
      case 'tickets':
        return (
          <Box p={8}>
            <Box textAlign="center" py={20}>
              <Box fontSize="6xl" mb={4}>🎫</Box>
              <Box fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
                Tickets Pendientes
              </Box>
              <Box color="gray.500">
                Sección en desarrollo - Aquí se mostrarán todos los tickets de mantenimiento
              </Box>
            </Box>
          </Box>
        );
      case 'maintenance':
        return (
          <Box p={8}>
            <Box textAlign="center" py={20}>
              <Box fontSize="6xl" mb={4}>🔧</Box>
              <Box fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
                Mantenimiento
              </Box>
              <Box color="gray.500">
                Sección en desarrollo - Aquí se mostrará el calendario de mantenimientos
              </Box>
            </Box>
          </Box>
        );
      case 'mileage':
        return (
          <Box p={8}>
            <Box textAlign="center" py={20}>
              <Box fontSize="6xl" mb={4}>📏</Box>
              <Box fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
                Control de Kilometrajes
              </Box>
              <Box color="gray.500">
                Sección en desarrollo - Aquí se mostrarán vehículos con kilometraje alto
              </Box>
            </Box>
          </Box>
        );
      case 'revisions':
        return (
          <Box p={8}>
            <Box textAlign="center" py={20}>
              <Box fontSize="6xl" mb={4}>🔍</Box>
              <Box fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
                Alertas de Revisión
              </Box>
              <Box color="gray.500">
                Sección en desarrollo - Aquí se mostrarán las alertas de revisión programadas
              </Box>
            </Box>
          </Box>
        );
      case 'consumption':
        return (
          <Box p={8}>
            <Box textAlign="center" py={20}>
              <Box fontSize="6xl" mb={4}>⛽</Box>
              <Box fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
                Análisis de Consumo
              </Box>
              <Box color="gray.500">
                Sección en desarrollo - Consumo por mes/año/departamento
              </Box>
            </Box>
          </Box>
        );
      case 'analytics':
        return (
          <Box p={8}>
            <Box textAlign="center" py={20}>
              <Box fontSize="6xl" mb={4}>📈</Box>
              <Box fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
                Analíticas y Gráficas
              </Box>
              <Box color="gray.500">
                Sección en desarrollo - Gráficas de rendimiento y estadísticas
              </Box>
            </Box>
          </Box>
        );
      case 'departments':
        return (
          <Box p={8}>
            <Box textAlign="center" py={20}>
              <Box fontSize="6xl" mb={4}>🏢</Box>
              <Box fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
                Control por Departamentos
              </Box>
              <Box color="gray.500">
                Sección en desarrollo - Análisis por área o departamento
              </Box>
            </Box>
          </Box>
        );
      case 'alerts':
        return (
          <Box p={8}>
            <Box textAlign="center" py={20}>
              <Box fontSize="6xl" mb={4}>🚨</Box>
              <Box fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
                Centro de Alertas
              </Box>
              <Box color="gray.500">
                Sección en desarrollo - Aquí se mostrarán las alertas del sistema
              </Box>
            </Box>
          </Box>
        );

      case 'profile':
        return <UserProfile />;
      case 'settings':
        return (
          <Box p={8}>
            <Box textAlign="center" py={20}>
              <Box fontSize="6xl" mb={4}>⚙️</Box>
              <Box fontSize="2xl" fontWeight="bold" color="gray.700" mb={2}>
                Configuración del Sistema
              </Box>
              <Box color="gray.500">
                Sección en desarrollo - Aquí se mostrarán las configuraciones
              </Box>
            </Box>
          </Box>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Flex direction="column" h="100vh">
      {/* Top Bar */}
      <Box
        h="60px"
        bg={topBarBg}
        borderBottom="1px solid"
        borderColor={borderColor}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1002}
        px={4}
      >
        <HStack h="100%" justify="space-between" align="center">
          {/* Left Side - Menu Toggle */}
          <HStack spacing={3}>
            <IconButton
              aria-label={isMobile ? "Open menu" : (sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar")}
              icon={<Box fontSize="xl">{isMobile ? "☰" : (sidebarCollapsed ? "▶" : "◀")}</Box>}
              variant="ghost"
              size="sm"
              onClick={isMobile ? onToggle : handleSidebarToggle}
            />
            {!isMobile && (
              <Box 
                fontSize="lg" 
                fontWeight="bold" 
                color={logoColor}
                cursor="pointer"
                onClick={() => handleSectionChange('dashboard')}
                _hover={{
                  color: 'blue.500',
                  transform: 'translateY(-1px)',
                }}
                transition="all 0.2s ease"
                px={2}
                py={1}
                borderRadius="md"
              >
                FlotaAdmin
              </Box>
            )}
          </HStack>

          {/* Right Side - Theme Selector & User Profile */}
          <HStack spacing={3}>
            <ThemeSelector />
            
            {/* User Profile Menu */}
            <Menu>
              <MenuButton
                as={UserAvatar}
                size="sm"
                cursor="pointer"
                _hover={{ bg: "blue.600" }}
              />
              <MenuList bg={topBarBg} border="1px solid" borderColor={borderColor}>
                <VStack spacing={0} align="stretch" p={2}>
                  <Text fontSize="sm" fontWeight="bold" color={logoColor} px={3} py={2}>
                    {user.name}
                  </Text>
                  <Text fontSize="xs" color={userSubtextColor} px={3} pb={2}>
                    {user.role}
                  </Text>
                </VStack>
                <Divider />
                <MenuItem icon={<Text>💼</Text>} color={logoColor} onClick={() => handleSectionChange('profile')}>
                  Mi Perfil
                </MenuItem>
                <MenuItem icon={<Text>⚙️</Text>} color={logoColor}>
                  Configuración
                </MenuItem>
                <MenuItem icon={<Text>📊</Text>} color={logoColor}>
                  Reportes
                </MenuItem>
                <Divider />
                <MenuItem icon={<Text>🚪</Text>} color="red.500">
                  Cerrar Sesión
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>
      </Box>

      {/* Main Content Area */}
      <Flex flex={1} pt="60px">

        {/* Sidebar */}
        <Sidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          isOpen={isMobile ? isOpen : !sidebarCollapsed}
          onClose={onClose}
          isMobile={isMobile}
          isCollapsed={sidebarCollapsed}
        />
      
        {/* Main Content */}
        <Box 
          flex={1} 
          ml={{ base: 0, lg: sidebarCollapsed ? 0 : "280px" }}
          bg={mainBg} 
          minH="calc(100vh - 60px)"
          transition="margin-left 0.3s ease"
        >
          {renderContent()}
        </Box>

        {/* Mobile Overlay */}
        {isMobile && isOpen && (
          <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="blackAlpha.600"
            zIndex={999}
            onClick={onClose}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Layout;
