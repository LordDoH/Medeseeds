import React from 'react';
import { IoIosArrowUp } from 'react-icons/io';
import './UpsideDock.scss';

function UpsideDock() {
  const scrollUp = () => {
    window.scroll(0, 0);
  };
  return (
    <div className="upsidedock" onClick={scrollUp}>
      <IoIosArrowUp />
    </div>
  );
}

export default UpsideDock;
