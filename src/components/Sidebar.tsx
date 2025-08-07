import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Avatar,
  Badge,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import { useUser } from '../contexts/UserContext';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange, isOpen, onClose, isMobile, isCollapsed = false }) => {
  const { user } = useUser();
  const sidebarBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  const activeBg = useColorModeValue('blue.50', 'blue.900');
  const textColor = useColorModeValue('gray.700', 'white');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.300');
  const logoColor = useColorModeValue('gray.800', 'white');
  const badgeTextColor = useColorModeValue('gray.600', 'gray.200');
  const activeColor = useColorModeValue('blue.600', 'blue.200');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      description: 'Panel principal',
    },
    {
      id: 'vehicles',
      label: 'Vehículos',
      icon: '🚛',
      description: 'Inventario de flota',
      badge: '245',
    },
    {
      id: 'maintenance',
      label: 'Mantenimientos',
      icon: '🔧',
      description: 'Servicios y reparaciones',
      badge: '14',
      badgeColor: 'orange',
    },
    {
      id: 'damages',
      label: 'Daños',
      icon: '⚠️',
      description: 'Daños de vehículos',
      badge: '7',
      badgeColor: 'red',
    },
    {
      id: 'tickets',
      label: 'Tickets',
      icon: '🎫',
      description: 'Tickets pendientes',
      badge: '23',
      badgeColor: 'blue',
    },
    {
      id: 'alerts',
      label: 'Alertas',
      icon: '🚨',
      description: 'Notificaciones críticas',
      badge: '5',
      badgeColor: 'red',
    },
    {
      id: 'mileage',
      label: 'Kilometrajes',
      icon: '📏',
      description: 'Control de kilometraje',
      badge: '12',
      badgeColor: 'yellow',
    },
    {
      id: 'revisions',
      label: 'Revisiones',
      icon: '🔍',
      description: 'Alertas de revisión',
      badge: '8',
      badgeColor: 'orange',
    },
    {
      id: 'consumption',
      label: 'Consumo',
      icon: '⛽',
      description: 'Análisis de combustible',
    },
    {
      id: 'analytics',
      label: 'Analíticas',
      icon: '📈',
      description: 'Gráficas y reportes',
    },
    {
      id: 'departments',
      label: 'Departamentos',
      icon: '🏢',
      description: 'Control por área',
    },
    {
      id: 'settings',
      label: 'Configuración',
      icon: '⚙️',
      description: 'Ajustes del sistema',
    },
  ];

  const navigate = useNavigate();

  const handleSectionChange = (section: string) => {
    // Navigate to the route
    navigate(`/${section}`);
    // Also update local state for consistency
    onSectionChange(section);
    if (isMobile) {
      onClose();
    }
  };

  return (
    <Box
      w="280px"
      h="calc(100vh - 60px)"
      bg={sidebarBg}
      borderRight="1px solid"
      borderColor={borderColor}
      position="fixed"
      left={isOpen ? 0 : "-280px"}
      top="60px"
      overflowY="auto"
      boxShadow="lg"
      zIndex={1000}
      transition="left 0.3s ease"
      display={isOpen ? 'block' : 'none'}
    >
      <VStack spacing={0} align="stretch">
        {/* Header */}
        <Box p={6} borderBottom="1px solid" borderColor={borderColor}>
          <HStack 
            spacing={3} 
            mb={4}
            cursor="pointer"
            onClick={() => handleSectionChange('dashboard')}
            _hover={{
              bg: hoverBg,
              transform: 'translateY(-1px)',
            }}
            transition="all 0.2s ease"
            borderRadius="lg"
            p={3}
            mx={-3}
          >
            <Text fontSize="2xl">🚛</Text>
            <VStack align="start" spacing={0}>
              <Text fontSize="lg" fontWeight="bold" color={logoColor}>
                FlotaAdmin
              </Text>
              <Text fontSize="xs" color={mutedTextColor}>
                Sistema de Gestión
              </Text>
            </VStack>
          </HStack>
          
          {/* User Profile */}
          <HStack spacing={3} p={3} bg={hoverBg} borderRadius="lg">
            <UserAvatar size="sm" />
            <VStack align="start" spacing={0} flex={1}>
              <Text fontSize="sm" fontWeight="600" color={textColor}>
                {user.name}
              </Text>
              <Text fontSize="xs" color={mutedTextColor}>
                {user.role.split(' ')[0]}
              </Text>
            </VStack>
          </HStack>
        </Box>

        {/* Navigation Menu */}
        <Box p={4}>
          <VStack spacing={1} align="stretch">
            {menuItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  h="auto"
                  p={3}
                  bg={activeSection === item.id ? activeBg : 'transparent'}
                  color={activeSection === item.id ? activeColor : textColor}
                  _hover={{
                    bg: activeSection === item.id ? activeBg : hoverBg,
                  }}
                  borderRadius="lg"
                  onClick={() => handleSectionChange(item.id)}
                >
                  <HStack spacing={3} w="100%">
                    <Text fontSize="lg">{item.icon}</Text>
                    <VStack align="start" spacing={0} flex={1}>
                      <HStack justify="space-between" w="100%">
                        <Text fontSize="sm" fontWeight="600">
                          {item.label}
                        </Text>
                        {item.badge && (
                          <Badge
                            colorScheme={item.badgeColor || 'blue'}
                            borderRadius="full"
                            fontSize="xs"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </HStack>
                      <Text fontSize="xs" color="gray.500" textAlign="left">
                        {item.description}
                      </Text>
                    </VStack>
                  </HStack>
                </Button>
                
                {/* Add dividers for logical groupings */}
                {(index === 2 || index === 6 || index === 9) && (
                  <Divider my={2} />
                )}
              </React.Fragment>
            ))}
          </VStack>
        </Box>

        {/* Footer */}
        <Box mt="auto" p={4} borderTop="1px solid" borderColor={borderColor}>
          <VStack spacing={2}>
            <HStack spacing={2} w="100%">
              <Box flex={1} bg="green.100" h={2} borderRadius="full">
                <Box bg="green.500" h={2} borderRadius="full" w="85%" />
              </Box>
              <Text fontSize="xs" color="gray.500">85%</Text>
            </HStack>
            <Text fontSize="xs" color="gray.500" textAlign="center">
              Sistema funcionando correctamente
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar;
