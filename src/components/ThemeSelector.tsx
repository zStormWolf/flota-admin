import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { useThemeContext } from '../contexts/ThemeContext';

const ThemeSelector: React.FC = () => {
  const { colorModeOption, setColorModeOption } = useThemeContext();
  const iconColor = useColorModeValue('gray.600', 'gray.300');
  const menuBg = useColorModeValue('white', 'gray.700');
  const menuBorderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.100', 'gray.600');
  const selectedBg = useColorModeValue('blue.50', 'blue.900');
  const itemHoverBg = useColorModeValue('gray.50', 'gray.600');

  const getThemeIcon = (mode: string) => {
    switch (mode) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'system': return '💻';
      default: return '💻';
    }
  };

  const getThemeLabel = (mode: string) => {
    switch (mode) {
      case 'light': return 'Claro';
      case 'dark': return 'Oscuro';
      case 'system': return 'Sistema';
      default: return 'Sistema';
    }
  };

  const themeOptions = [
    { value: 'light', label: 'Claro', icon: '☀️' },
    { value: 'dark', label: 'Oscuro', icon: '🌙' },
    { value: 'system', label: 'Sistema', icon: '💻' },
  ];

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Cambiar tema"
        icon={
          <Text fontSize="lg">
            {getThemeIcon(colorModeOption)}
          </Text>
        }
        variant="ghost"
        color={iconColor}
        size="sm"
        _hover={{
          bg: hoverBg,
        }}
      />
      <MenuList bg={menuBg} border="1px solid" borderColor={menuBorderColor}>
        {themeOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => setColorModeOption(option.value as any)}
            bg={colorModeOption === option.value ? selectedBg : 'transparent'}
            _hover={{
              bg: itemHoverBg,
            }}
          >
            <HStack spacing={3}>
              <Text fontSize="md">{option.icon}</Text>
              <Text fontWeight={colorModeOption === option.value ? 'bold' : 'normal'}>
                {option.label}
              </Text>
              {colorModeOption === option.value && (
                <Text fontSize="sm" color="blue.500">✓</Text>
              )}
            </HStack>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ThemeSelector;
