import React from 'react';
import { AtomicProvider } from './context/ElementContext';
import PeriodicTable from './PTable';
import NewAtom from './NewAtom';
import Planets from './Planets';

function App() {
  return (
    <AtomicProvider>
      <NewAtom />
      <PeriodicTable />
    </AtomicProvider>
  );
}

export default App;
