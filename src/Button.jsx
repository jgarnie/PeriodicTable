import React from 'react';
import { useAtomicContext } from './context/ElementContext';
import styled from 'styled-components';

const StyledButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 40px;
  padding: 4px 4px 2px 4px;
  box-shadow: 1px 0 0 0 #fff, 0 1px 0 0 #fff, 1px 1px 0 0 #fff,
    1px 0 0 0 #fff inset, 0 1px 0 0 #fff inset;
  transition: transform 0.2s ease-in-out;
  color: white;
  &:hover {
    transform: scale(1.5);
  }
  &:hover > div {
    overflow: visible;
    text-overflow: clip;
  }
  cursor: pointer;
`;

const StyledButtonText = styled.div`
  font-size: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;
const StyledAttomicNumber = styled.div`
  font-size: 8px;
  width: 100%;
`;

const StyledButtonSymbol = styled.div`
  font-size: 16px;
  text-align: center;
  width: 100%;
`;

const Button = ({ atomData }) => {
  const { setAtom } = useAtomicContext();

  const handleSelectedElement = () => {
    const protons = atomData.number;
    const neutrons = Math.round(atomData.atomic_mass) - atomData.number;
    const electrons = atomData.number;
    const particleInfo = {
      protons,
      neutrons,
      electrons,
    };
    setAtom({ ...atomData, ...particleInfo });

    return;
  };
  return (
    <StyledButton className={atomData.category} onClick={handleSelectedElement}>
      <StyledAttomicNumber>{atomData.number}</StyledAttomicNumber>
      <StyledButtonSymbol>{atomData.symbol}</StyledButtonSymbol>
      <StyledButtonText>{atomData.name}</StyledButtonText>
    </StyledButton>
  );
};

export default Button;
