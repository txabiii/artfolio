'use client';

import React, { createContext, useState, ReactNode } from 'react';

interface NavbarContextProps {
  mode: string;
  isAlwaysVisible: boolean;
  isHiddenMenuVisible: boolean;
  setMode: (mode: string) => void;
  setIsAlwaysVisible: (isAlwaysVisible: boolean) => void;
  setIsHiddenMenuVisible: (isHiddenMenuVisible: boolean) => void;
}

export const NavbarContext = createContext<NavbarContextProps>({
  mode: 'artfolio',
  isAlwaysVisible: false,
  isHiddenMenuVisible: false,
  setMode: () => {},
  setIsAlwaysVisible: () => {},
  setIsHiddenMenuVisible: () => {}
});

interface NavbarContextProviderProps {
  children: ReactNode;
}

export const NavbarContextProvider = ({ children }: NavbarContextProviderProps) => {
  const [mode, setMode] = useState<string>('artfolio');
  const [isAlwaysVisible, setIsAlwaysVisible] = useState<boolean>(false);
  const [isHiddenMenuVisible, setIsHiddenMenuVisible] = useState<boolean>(false);

  const contextValue = {
    mode,
    isAlwaysVisible,
    isHiddenMenuVisible,
    setMode,
    setIsAlwaysVisible,
    setIsHiddenMenuVisible
  };

  return (
    <NavbarContext.Provider value={contextValue}>{children}</NavbarContext.Provider>
  );
};
