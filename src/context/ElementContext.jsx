import React, { createContext, useContext, useState } from 'react';

export const AtomicContext = createContext();

export const AtomicProvider = ({ children }) => {
  const [atom, setAtom] = useState({});

  return (
    <AtomicContext.Provider value={{ atom, setAtom }}>
      {children}
    </AtomicContext.Provider>
  );
};

export const useAtomicContext = () => {
  return useContext(AtomicContext);
};
