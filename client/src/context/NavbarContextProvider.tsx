import React, { createContext, useState, ReactNode } from 'react';

interface NavbarContextProps {
  mode: string;
  isAlwaysVisible: boolean;
  setMode: (mode: string) => void;
  setIsAlwaysVisible: (isAlwaysVisible: boolean) => void;
}

export const NavbarContext = createContext<NavbarContextProps>({
  mode: 'artfolio',
  isAlwaysVisible: false,
  setMode: () => {},
  setIsAlwaysVisible: () => {},
});

interface NavbarContextProviderProps {
  children: ReactNode;
}

export const NavbarContextProvider = ({ children }: NavbarContextProviderProps) => {
  const [mode, setMode] = useState<string>('artfolio');
  const [isAlwaysVisible, setIsAlwaysVisible] = useState<boolean>(false);

  const contextValue = {
    mode,
    isAlwaysVisible,
    setMode,
    setIsAlwaysVisible,
  };

  return (
    <NavbarContext.Provider value={contextValue}>{children}</NavbarContext.Provider>
  );
};
