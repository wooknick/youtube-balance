import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../Styles/globalStyle";
import theme from "../Styles/theme";
import Grid from "./Grid";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    chrome.storage.local.get("yl-data", (items) => {
      const storageData = items["yl-data"];
      setData(storageData);
    });
  }, []);

  const clearCache = () => {
    setData(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Wrapper>
        <Grid data={data} clearCache={clearCache} />
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
