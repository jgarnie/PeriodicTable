import React, { useEffect, useState } from 'react';
import './PeriodicTable.css';
import { BOTTOM, LEFT_SIDE, RIGHT_SIDE } from './const';
import { useAtomicContext } from './context/ElementContext';
import styled from 'styled-components';
import Button from './Button';

const StyledPeriodicTable = styled.div`
  display: grid;
  gap: 15px;
  overflow: visible;
  grid-template-areas:
    'side side main main main main'
    'side side main main main main'
    'side side main main main main'
    'side side main main main main'
    'side side main main main main'
    'side side main main main main'
    'side side main main main main'
    '. . below below below below';
  width: fit-content;
`;

const StyledLeftGroup = styled.div`
  grid-area: side;
  display: flex;
  flex-direction: row;
`;
const StyledLeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const StyledRigthGroup = styled.div`
  grid-area: main;
  display: flex;
  justify-content: flex-end;
`;

const StyledRightColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const StyledBottomGroup = styled.div`
  grid-area: below;
`;
const StyledBottomRow = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const PeriodicTable = () => {
  return (
    <StyledPeriodicTable>
      <StyledLeftGroup>
        {LEFT_SIDE.map((elCol, index) => (
          <StyledLeftColumn key={`${index}'left'`}>
            {elCol.map((element) => (
              <Button key={element.symbol} atomData={element} />
            ))}
          </StyledLeftColumn>
        ))}
      </StyledLeftGroup>

      <StyledRigthGroup>
        {RIGHT_SIDE.map((elColRight, index) => (
          <StyledRightColumn key={`${index}'right'`}>
            {elColRight.map((element) => (
              <Button key={element.symbol} atomData={element} />
            ))}
          </StyledRightColumn>
        ))}
      </StyledRigthGroup>

      <StyledBottomGroup>
        {BOTTOM.map((elCol, index) => (
          <StyledBottomRow key={`${index}'bottom'`}>
            {elCol.map((element) => (
              <Button key={element.symbol} atomData={element} />
            ))}
          </StyledBottomRow>
        ))}
      </StyledBottomGroup>
    </StyledPeriodicTable>
  );
};

export default PeriodicTable;
