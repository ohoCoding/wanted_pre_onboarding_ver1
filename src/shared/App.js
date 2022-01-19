import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configStore";
import { useDispatch } from "react-redux";
import GlobalStyles from "./GlobalStyles";
import { ThemeProvider } from "styled-components";
import { actionCreators as userActions } from "../redux/modules/user";

import Explore from "../pages/Explore";
import Opening from "../pages/Opening";

import theme from "./theme";
import Header from "../components/Header";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userActions.loginCheckDB());
  }, []);

  return (
     <>
       <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter history={history}> 
        <Header />
         <Routes>
          <Route path="/" element={<Explore/>} />
          <Route path="/opening/:openingId" element={<Opening/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
     </>
      
     
  );
};

export default App;
