import React, { useEffect, useState } from 'react';
import './PeriodicTable.css';
import { BOTTOM, LEFT_SIDE, RIGHT_SIDE } from './const';
import { useAtomicContext } from './context/ElementContext';

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
    <div className="container">
      <div className="periodic-table">
        <div className="left-group">
          {LEFT_SIDE.map((elCol, index) => (
            <div key={index} className="left-column">
              {elCol.map((element) => (
                <button
                  key={element.number}
                  className={element.category}
                  onClick={() => handleSelectedElement(element)}
                >
                  {element.symbol}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="right-group">
          {RIGHT_SIDE.map((elColRight, index) => (
            <div key={index} className="right-column">
              {elColRight.map((element) => (
                <button
                  key={element.number}
                  className={element.category}
                  onClick={() => handleSelectedElement(element)}
                >
                  {element.symbol}
                </button>
              ))}
            </div>
          ))}
        </div>

        <div className="bottom-group">
          {BOTTOM.map((elCol, index) => (
            <div key={index} className="bottom-row">
              {elCol.map((element) => (
                <button
                  key={element.number}
                  className={element.category}
                  onClick={() => handleSelectedElement(element)}
                >
                  {element.symbol}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable;
