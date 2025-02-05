import React from 'react';
import { AtomicProvider } from './context/ElementContext';
// import PeriodicTable from './PTable';
import NewAtom from './NewAtom';
import Planets from './Planets';
import PeriodicTable from './PeriodicTable';
import styled from 'styled-components';

const StyledMainWrapper = styled.div`
  display: flex;
  max-width: 90%;
  margin: auto;
`;

function App() {
  return (
    <AtomicProvider>
      <StyledMainWrapper>
        <PeriodicTable />
        <NewAtom />
      </StyledMainWrapper>
    </AtomicProvider>
  );
}

export default App;
