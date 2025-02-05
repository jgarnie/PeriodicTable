import React, { useEffect, useState } from 'react';
import './PeriodicTable.css';
import { BOTTOM, LEFT_SIDE, RIGHT_SIDE } from './const';
import { useAtomicContext } from './context/ElementContext';
import styled from 'styled-components';

const StyledPeriodicTable = styled.div`
  display: grid;
  padding: 20px;
  gap: 15px;
  overflow: scroll;
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
  const { atom, setAtom } = useAtomicContext();

  const handleSelectedElement = (element) => {
    const protons = element.number;
    const neutrons = Math.round(element.atomic_mass) - element.number;
    const electrons = element.number;
    const particleInfo = {
      protons,
      neutrons,
      electrons,
    };
    setAtom({ ...element, ...particleInfo });

    return;
  };

  return (
    <>
      <StyledPeriodicTable>
        <StyledLeftGroup>
          {LEFT_SIDE.map((elCol, index) => (
            <StyledLeftColumn>
              {elCol.map((element) => (
                <button
                  key={element.number}
                  className={element.category}
                  onClick={() => handleSelectedElement(element)}
                >
                  {element.symbol}
                </button>
              ))}
            </StyledLeftColumn>
          ))}
        </StyledLeftGroup>

        <StyledRigthGroup>
          {RIGHT_SIDE.map((elColRight, index) => (
            <StyledRightColumn>
              {elColRight.map((element) => (
                <button
                  key={element.number}
                  className={element.category}
                  onClick={() => handleSelectedElement(element)}
                >
                  {element.symbol}
                </button>
              ))}
            </StyledRightColumn>
          ))}
        </StyledRigthGroup>

        <StyledBottomGroup>
          {BOTTOM.map((elCol, index) => (
            <StyledBottomRow>
              {elCol.map((element) => (
                <button
                  key={element.number}
                  className={element.category}
                  onClick={() => handleSelectedElement(element)}
                >
                  {element.symbol}
                </button>
              ))}
            </StyledBottomRow>
          ))}
        </StyledBottomGroup>
      </StyledPeriodicTable>
    </>
  );
};

export default PeriodicTable;
