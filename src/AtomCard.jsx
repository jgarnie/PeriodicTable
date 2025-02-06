import React from 'react';
import styled from 'styled-components';
import Atom from './Atom';
import { useAtomicContext } from './context/ElementContext';

const StyledCardWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
  box-shadow: 1px 1px 1px 1px grey;
  width: 25%;
  height: 80vh;
`;

const StyledHeader = styled.div`
  display: flex;
`;

const StyledSumary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  min-width: 100px;
  padding: 5px;
`;
const StyledSumaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledHeaderName = styled.div`
  font-size: 24px;
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const StyledSummarySymbol = styled.div`
  font-size: 36px;
  text-align: center;
`;
const StyledSummaryName = styled.div`
  text-align: center;
`;

const StyledTitle = styled.div`
  width: 100%;
  text-align: center;
`;
const StyledFooter = styled.div``;

const AtomCard = () => {
  const { atom } = useAtomicContext();

  return (
    <StyledCardWrapper>
      <StyledHeader>
        <StyledSumary className={atom.category || 'nonmetal'}>
          <StyledSumaryHeader>
            <div>{atom.number || 'XX'}</div>
            <div>{atom.atomic_mass || 'XX'}</div>
          </StyledSumaryHeader>
          <StyledSummarySymbol>{atom.symbol || 'XX'}</StyledSummarySymbol>
          <StyledSummaryName>{atom.name || 'XX'}</StyledSummaryName>
        </StyledSumary>
        <StyledHeaderName>
          <h4>{atom.name || 'XX'}</h4>
          <div>{atom.category || 'XX'}</div>
        </StyledHeaderName>
      </StyledHeader>
      <Atom />
      <StyledTitle>{atom.name || 'XX'}</StyledTitle>
      <StyledFooter>
        <div>
          Mass: <b>{atom.atomic_mass || 'XX'}</b>
        </div>
        <div>
          Protons: <b>{atom.protons || 'XX'}</b>
        </div>
        <div>
          Neutrons: <b>{atom.neutrons || 'XX'}</b>
        </div>
        <div>
          Electrons: <b>{atom.electrons || 'XX'}</b>{' '}
        </div>
        <div>
          Electron Configuration: <b>{atom.electron_configuration || 'XX'}</b>{' '}
        </div>
      </StyledFooter>
    </StyledCardWrapper>
  );
};

export default AtomCard;
