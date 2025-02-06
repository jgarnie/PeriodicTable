import React from 'react';
import { AtomicProvider } from './context/ElementContext';
import PeriodicTable from './PeriodicTable';
import styled from 'styled-components';
import AtomCard from './AtomCard';

const StyledMainWrapper = styled.div`
  display: flex;
  max-width: 95%;
  margin: auto;
  margin-top: 10px;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100vh;
  align-items: flex-start;
  @media (min-width: 1100px) {
    flex-direction: row;
  }
`;

function App() {
  return (
    <AtomicProvider>
      <StyledMainWrapper>
        <PeriodicTable />
        <AtomCard />
      </StyledMainWrapper>
    </AtomicProvider>
  );
}

export default App;
