import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Circle = styled.div`
  position: relative;
  width: ${(props) => props.size}px;
  height: auto;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${(props) =>
    props.size === 8 ? "#6c6c6c" : props.theme.colors[props.category]};
  transition: transform 0.1s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  div {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    z-index: 10;
  }
  span {
    font-size: 12px;
    color: white;
    position: absolute;
    z-index: 1;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: -${(props) => props.size / 2}px;
  width: max-content;
  height: auto;
  border: 1px solid #363636;
  border-radius: 4px;
  background-color: white;
  padding: 8px;
  z-index: 100;
`;

const GridItem = ({ data, category, max }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getSize = () => {
    return 72 * (data.length / max) + 8;
  };

  const handleMouseEnter = (e) => {
    setShowTooltip(true);
  };

  const handleMouseOut = (e) => {
    setShowTooltip(false);
  };

  return (
    <Wrapper>
      <Circle size={getSize()} category={category}>
        <div onMouseEnter={handleMouseEnter} onMouseOut={handleMouseOut}></div>
        {showTooltip && data.length > 0 && <span>{data.length}</span>}
      </Circle>
      {showTooltip && <Tooltip size={getSize()}>{category}</Tooltip>}
    </Wrapper>
  );
};

export default GridItem;
