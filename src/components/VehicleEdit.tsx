import React, { useState } from 'react';
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
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  Textarea,
  useColorModeValue,
  useToast,
  Divider,
  SimpleGrid,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

interface VehicleEditProps {
  vehicleId: string;
  onBack: () => void;
  onSave: () => void;
}

const VehicleEdit: React.FC<VehicleEditProps> = ({ vehicleId, onBack, onSave }) => {
  const toast = useToast();
  
  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.700', 'white');
  const mutedTextColor = useColorModeValue('gray.500', 'gray.300');
  const headingColor = useColorModeValue('gray.800', 'white');

  // Estado del formulario (datos iniciales del vehículo ABC-123)
  const [formData, setFormData] = useState({
    plate: 'ABC-123',
    brand: 'Volvo',
    model: 'FH16',
    year: 2022,
    type: 'Camión',
    status: 'available',
    mileage: 45000,
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
    notes: 'Vehículo en excelente estado. Mantenimiento al día.',
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar en la base de datos
    toast({
      title: 'Vehículo actualizado',
      description: `Los datos del vehículo ${formData.plate} han sido guardados exitosamente.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onSave();
  };

  const handleCancel = () => {
    // Mostrar confirmación si hay cambios sin guardar
    onBack();
  };

  return (
    <Box p={6} bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh">
      <Container maxW="6xl">
        <VStack spacing={6} align="stretch">
          {/* Header - Responsive */}
          <VStack spacing={4} align="stretch" display={{ base: 'flex', md: 'none' }}>
            {/* Header móvil */}
            <HStack justify="space-between">
              <Button
                leftIcon={<Text>←</Text>}
                variant="outline"
                onClick={handleCancel}
                size="sm"
              >
                Cancelar
              </Button>
            </HStack>
            <VStack align="center" spacing={2}>
              <Heading size="md" color={headingColor} textAlign="center">
                ✏️ Editar Vehículo
              </Heading>
              <Text color={mutedTextColor} textAlign="center" fontSize="sm">
                Modificar información del vehículo {formData.plate}
              </Text>
              <Button colorScheme="blue" onClick={handleSave} size="sm" w="full">
                Guardar Cambios
              </Button>
            </VStack>
          </VStack>

          {/* Header - Desktop */}
          <HStack justify="space-between" align="center" display={{ base: 'none', md: 'flex' }}>
            <HStack spacing={4}>
              <Button
                leftIcon={<Text>←</Text>}
                variant="outline"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <VStack align="start" spacing={0}>
                <Heading size="lg" color={headingColor}>
                  ✏️ Editar Vehículo
                </Heading>
                <Text color={mutedTextColor}>
                  Modificar información del vehículo {formData.plate}
                </Text>
              </VStack>
            </HStack>
            
            <Button colorScheme="blue" onClick={handleSave}>
              Guardar Cambios
            </Button>
          </HStack>

          <Grid templateColumns={{ base: '1fr', md: '1fr', lg: '1fr 1fr' }} gap={{ base: 4, md: 6 }}>
            {/* Información Básica */}
            <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
              <CardBody p={{ base: 4, md: 6 }}>
                <Heading size={{ base: 'sm', md: 'md' }} color={headingColor} mb={{ base: 3, md: 4 }}>
                  📋 Información Básica
                </Heading>
                <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 3, md: 4 }}>
                    <FormControl isRequired>
                      <FormLabel color={textColor}>Placa</FormLabel>
                      <Input
                        value={formData.plate}
                        onChange={(e) => handleInputChange('plate', e.target.value)}
                        placeholder="ABC-123"
                      />
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel color={textColor}>Año</FormLabel>
                      <NumberInput
                        value={formData.year}
                        onChange={(value) => handleInputChange('year', parseInt(value) || 0)}
                        min={1990}
                        max={2030}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </SimpleGrid>

                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 3, md: 4 }}>
                    <FormControl isRequired>
                      <FormLabel color={textColor}>Marca</FormLabel>
                      <Select
                        value={formData.brand}
                        onChange={(e) => handleInputChange('brand', e.target.value)}
                      >
                        <option value="Volvo">Volvo</option>
                        <option value="Mercedes">Mercedes</option>
                        <option value="Scania">Scania</option>
                        <option value="Ford">Ford</option>
                        <option value="Isuzu">Isuzu</option>
                        <option value="MAN">MAN</option>
                        <option value="DAF">DAF</option>
                      </Select>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel color={textColor}>Modelo</FormLabel>
                      <Input
                        value={formData.model}
                        onChange={(e) => handleInputChange('model', e.target.value)}
                        placeholder="FH16"
                      />
                    </FormControl>
                  </SimpleGrid>

                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 3, md: 4 }}>
                    <FormControl isRequired>
                      <FormLabel color={textColor}>Tipo de Vehículo</FormLabel>
                      <Select
                        value={formData.type}
                        onChange={(e) => handleInputChange('type', e.target.value)}
                      >
                        <option value="Camión">Camión</option>
                        <option value="Camión Pequeño">Camión Pequeño</option>
                        <option value="Van">Van</option>
                        <option value="Pickup">Pickup</option>
                        <option value="Tráiler">Tráiler</option>
                      </Select>
                    </FormControl>

                    <FormControl isRequired>
                      <FormLabel color={textColor}>Estado</FormLabel>
                      <Select
                        value={formData.status}
                        onChange={(e) => handleInputChange('status', e.target.value)}
                      >
                        <option value="available">Disponible</option>
                        <option value="in_route">En Ruta</option>
                        <option value="maintenance">Mantenimiento</option>
                        <option value="damaged">Dañado</option>
                      </Select>
                    </FormControl>
                  </SimpleGrid>

                  <FormControl>
                    <FormLabel color={textColor}>VIN</FormLabel>
                    <Input
                      value={formData.vin}
                      onChange={(e) => handleInputChange('vin', e.target.value)}
                      placeholder="YV2RTZ0C8DA123456"
                    />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>

            {/* Especificaciones Técnicas */}
            <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
              <CardBody p={{ base: 4, md: 6 }}>
                <Heading size={{ base: 'sm', md: 'md' }} color={headingColor} mb={{ base: 3, md: 4 }}>
                  🔧 Especificaciones Técnicas
                </Heading>
                <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                  <FormControl>
                    <FormLabel color={textColor}>Motor</FormLabel>
                    <Input
                      value={formData.engine}
                      onChange={(e) => handleInputChange('engine', e.target.value)}
                      placeholder="D16G 750 HP"
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color={textColor}>Transmisión</FormLabel>
                    <Select
                      value={formData.transmission}
                      onChange={(e) => handleInputChange('transmission', e.target.value)}
                    >
                      <option value="I-Shift">I-Shift (Automática)</option>
                      <option value="Manual">Manual</option>
                      <option value="Semi-Automática">Semi-Automática</option>
                    </Select>
                  </FormControl>

                  <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 3, md: 4 }}>
                    <FormControl>
                      <FormLabel color={textColor}>Kilometraje</FormLabel>
                      <NumberInput
                        value={formData.mileage}
                        onChange={(value) => handleInputChange('mileage', parseInt(value) || 0)}
                        min={0}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>

                    <FormControl>
                      <FormLabel color={textColor}>Capacidad Combustible (L)</FormLabel>
                      <NumberInput
                        value={formData.fuelCapacity}
                        onChange={(value) => handleInputChange('fuelCapacity', parseInt(value) || 0)}
                        min={50}
                        max={1000}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  </SimpleGrid>

                  <FormControl>
                    <FormLabel color={textColor}>Nivel de Combustible (%)</FormLabel>
                    <NumberInput
                      value={formData.fuelLevel}
                      onChange={(value) => handleInputChange('fuelLevel', parseInt(value) || 0)}
                      min={0}
                      max={100}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>

            {/* Asignación y Ubicación */}
            <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
              <CardBody p={{ base: 4, md: 6 }}>
                <Heading size={{ base: 'sm', md: 'md' }} color={headingColor} mb={{ base: 3, md: 4 }}>
                  👤 Asignación y Ubicación
                </Heading>
                <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                  <FormControl>
                    <FormLabel color={textColor}>Conductor Asignado</FormLabel>
                    <Select
                      value={formData.driver}
                      onChange={(e) => handleInputChange('driver', e.target.value)}
                    >
                      <option value="Carlos Mendoza">Carlos Mendoza</option>
                      <option value="Ana García">Ana García</option>
                      <option value="Miguel Torres">Miguel Torres</option>
                      <option value="Laura Jiménez">Laura Jiménez</option>
                      <option value="Roberto Silva">Roberto Silva</option>
                      <option value="Patricia Morales">Patricia Morales</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel color={textColor}>Ubicación Actual</FormLabel>
                    <Select
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    >
                      <option value="Panamá">Panamá</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Colombia">Colombia</option>
                      <option value="México">México</option>
                    </Select>
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>

            {/* Documentos y Fechas */}
            <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
              <CardBody p={{ base: 4, md: 6 }}>
                <Heading size={{ base: 'sm', md: 'md' }} color={headingColor} mb={{ base: 3, md: 4 }}>
                  📄 Documentos y Fechas
                </Heading>
                <VStack spacing={{ base: 3, md: 4 }} align="stretch">
                  <FormControl>
                    <FormLabel color={textColor}>Fecha de Registro</FormLabel>
                    <Input
                      type="date"
                      value={formData.registrationDate}
                      onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color={textColor}>Vencimiento del Seguro</FormLabel>
                    <Input
                      type="date"
                      value={formData.insuranceExpiry}
                      onChange={(e) => handleInputChange('insuranceExpiry', e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel color={textColor}>Próxima Revisión Técnica</FormLabel>
                    <Input
                      type="date"
                      value={formData.technicalInspection}
                      onChange={(e) => handleInputChange('technicalInspection', e.target.value)}
                    />
                  </FormControl>
                </VStack>
              </CardBody>
            </Card>
          </Grid>

          {/* Notas */}
          <Card bg={cardBg} border="1px solid" borderColor={borderColor}>
            <CardBody>
              <Heading size="md" color={headingColor} mb={4}>
                📝 Notas y Observaciones
              </Heading>
              <FormControl>
                <Textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Agregar notas, observaciones o comentarios sobre el vehículo..."
                  rows={4}
                />
              </FormControl>
            </CardBody>
          </Card>

          {/* Botones de Acción */}
          <HStack justify="center" spacing={4} pt={4}>
            <Button
              variant="outline"
              size="lg"
              onClick={handleCancel}
            >
              Cancelar
            </Button>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={handleSave}
            >
              💾 Guardar Cambios
            </Button>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
};

export default VehicleEdit;
