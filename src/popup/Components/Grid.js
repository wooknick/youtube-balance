import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GridItem from "./GridItem";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  position: relative;
  width: 100%;
  font-size: 32px;
  color: #373737;
  ${(props) => props.theme.fonts.title};
  border-bottom: 1px solid #d3d3d3;
  padding: 12px 0px;
  margin: 12px 0px;
  text-align: center;
  div {
    font-size: 24px;
    color: white;
    position: absolute;
    bottom: 12px;
    right: 0px;
    &:hover {
      cursor: pointer;
      color: #e3e3e3;
    }
  }
`;

const SubTitle = styled.div`
  width: 100%;
  font-size: 24px;
  color: #373737;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: auto;
  gap: 10px;
`;

const Grid = ({ data, clearCache }) => {
  const [max, setMax] = useState(-1);
  useEffect(() => {
    if (data) {
      let newMax = max;
      Object.keys(data).forEach((category) => {
        const l = data[category].length;
        newMax = l > newMax ? l : newMax;
      });
      console.log(newMax);
      setMax(newMax);
    }
  }, [data]);

  const handleClick = () => {
    chrome.storage.local.clear();
    clearCache();
  };

  return (
    <Wrapper>
      <Title>
        Youtube Balance
        {data && <div onClick={handleClick}>reset</div>}
      </Title>
      {!data && <SubTitle>Watch Youtube and Check it Later</SubTitle>}
      <Content>
        {data &&
          Object.keys(data).map((category) => (
            <GridItem
              key={category}
              data={data[category]}
              category={category}
              max={max}
            />
          ))}
      </Content>
    </Wrapper>
  );
};

export default Grid;
