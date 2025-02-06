import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Atom from './Atom';
import { useAtomicContext } from './context/ElementContext';
import RadioactiveIcon from './RadioactiveIcon';

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
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const StyledSummarySymbol = styled.div`
  font-size: 36px;
  text-align: center;
  position: relative;
  & span {
    font-size: 16px;
    position: absolute;
    top: 0;
  }
`;
const StyledTitleTop = styled.div`
  font-size: 24px;
  padding: 10px 0px;
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
  const [electronsChange, setElectronsChange] = useState(0);
  const [neutronsChange, setNeutronsChange] = useState(0);
  const [originalAtom, setOriginalAtom] = useState({});

  const { atom, setAtom } = useAtomicContext();

  useEffect(() => {
    if (originalAtom?.number && originalAtom.number === atom.number) {
      return;
    }
    setOriginalAtom(atom);
  }, [atom]);

  const removeElectron = () => {
    if (atom.electrons > 0) {
      const newAtom = { ...atom, electrons: atom.electrons - 1 };
      setAtom(newAtom);
      setElectronsChange(electronsChange - 1);
    }
  };

  const addElectron = () => {
    const newAtom = { ...atom, electrons: atom.electrons + 1 };
    setAtom(newAtom);
    setElectronsChange(electronsChange + 1);
  };

  const removeNeutron = () => {
    if (atom.neutrons > 0) {
      const newAtom = { ...atom, neutrons: atom.neutrons - 1 };
      setAtom(newAtom);
      setNeutronsChange(neutronsChange - 1);
    }
  };

  const addNeutron = () => {
    const newAtom = { ...atom, neutrons: atom.neutrons + 1 };
    setAtom(newAtom);
    setNeutronsChange(neutronsChange + 1);
  };

  const isRadioactive = () => {
    if (atom.protons > 83) {
      return true;
    }
    const stability = atom.neutrons / atom.protons;
    if (atom.protons > 20) {
      if (stability > 1.5 || stability < 1.2) {
        return true;
      }
      return false;
    }
    if (stability > 1.1 || stability < 0.9) return true;
    return false;
  };

  return (
    <StyledCardWrapper>
      <StyledHeader>
        <StyledSumary className={atom.category || 'nonmetal'}>
          <StyledSumaryHeader>
            <div>{atom.number || 'XX'}</div>
            <div>{atom.atomic_mass || 'XX'}</div>
          </StyledSumaryHeader>
          <StyledSummarySymbol>
            {atom.symbol || 'XX'}{' '}
            {electronsChange !== 0 && (
              <span>
                {Math.abs(electronsChange)}
                {electronsChange > 0 ? '+' : '-'}
              </span>
            )}
          </StyledSummarySymbol>
          <StyledSummaryName>{atom.name || 'XX'}</StyledSummaryName>
        </StyledSumary>
        <StyledHeaderName>
          {electronsChange !== 0
            ? electronsChange > 0
              ? 'cation'
              : 'ion'
            : ''}
          <StyledTitleTop>
            {atom.name || 'XX'}
            {neutronsChange !== 0 ? (
              <span>
                -{originalAtom.protons + originalAtom.neutrons + neutronsChange}
              </span>
            ) : (
              ''
            )}
          </StyledTitleTop>
          <div>{atom.category || 'XX'}</div>
        </StyledHeaderName>
        {isRadioactive() && <RadioactiveIcon />}
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
          <button onClick={removeNeutron}>remove</button>
          <button onClick={addNeutron}>add</button>
        </div>
        <div>
          Electrons: <b>{atom.electrons || 'XX'}</b>{' '}
          <button onClick={removeElectron}>remove</button>
          <button onClick={addElectron}>add</button>
        </div>
        <div>
          Electron Configuration: <b>{atom.electron_configuration || 'XX'}</b>{' '}
        </div>
      </StyledFooter>
    </StyledCardWrapper>
  );
};

export default AtomCard;
