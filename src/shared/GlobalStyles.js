import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset};

  * {
    box-sizing: border-box;
    font-family: 'Nanum Gothic', sans-serif;
  }

  body {
    padding-top: 80px;
    font-family: 'Nanum Gothic', sans-serif;
    color: ${({ theme }) => theme.colors.black};


  }
  
  a {
    color: black;
    text-decoration: none;
  }

  button, 
  input,
  textarea {
    color: black;
    background-color: transparent;
    border: none;
    outline: none;
  }

  button {
    padding: 0;
    cursor: pointer;
  }

  li {
    list-style: none;
  }
`;

export default GlobalStyles;
