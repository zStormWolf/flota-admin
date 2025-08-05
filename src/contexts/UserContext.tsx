import React, { createContext, useContext } from 'react';

interface UserContextType {
  user: {
    name: string;
    role: string;
    email: string;
    phone: string;
    department: string;
    initials: string;
    avatar?: string;
  };
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = {
    name: 'Admin Usuario',
    role: 'Administrador del Sistema',
    email: 'admin@flotaadmin.com',
    phone: '+507 6000-0000',
    department: 'Administración',
    initials: 'AU',
    avatar: '', // URL de imagen si existe
  };

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};
