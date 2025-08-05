import React from 'react';
import { Avatar, AvatarProps } from '@chakra-ui/react';
import { useUser } from '../contexts/UserContext';

interface UserAvatarProps extends Omit<AvatarProps, 'name' | 'src'> {
  showInitials?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  showInitials = true, 
  bg = "blue.500",
  color = "white",
  ...props 
}) => {
  const { user } = useUser();

  return (
    <Avatar
      name={showInitials ? user.name : undefined}
      src={user.avatar || ""}
      bg={bg}
      color={color}
      {...props}
      // Forzar centrado perfecto
      display="flex !important"
      alignItems="center !important"
      justifyContent="center !important"
      textAlign="center"
      fontWeight="bold"
      fontSize={props.size === 'sm' ? 'xs' : props.size === 'lg' ? 'md' : 'sm'}
      // Centrado adicional para las iniciales
      sx={{
        display: 'flex !important',
        alignItems: 'center !important',
        justifyContent: 'center !important',
        '& > div': {
          display: 'flex !important',
          alignItems: 'center !important',
          justifyContent: 'center !important',
          width: '100%',
          height: '100%',
        },
        // Centrado específico para el texto de las iniciales
        '& .chakra-avatar__initials': {
          display: 'flex !important',
          alignItems: 'center !important',
          justifyContent: 'center !important',
          width: '100% !important',
          height: '100% !important',
          textAlign: 'center !important',
          lineHeight: '1 !important',
        },
        // Asegurar que el contenedor del avatar esté centrado
        '&.chakra-avatar': {
          display: 'flex !important',
          alignItems: 'center !important',
          justifyContent: 'center !important',
        }
      }}
    />
  );
};

export default UserAvatar;
