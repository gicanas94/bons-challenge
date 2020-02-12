import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  ::selection {
    background: #d1c9db;
  }

  ::-moz-selection {
    background: #d1c9db;
  }

  body {
    background: #eeeeee;
    color: #4f4957;
    font-family: 'Alegreya Sans', sans-serif;
    font-size: 26px;
    margin: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #7a609c;
    font-weight: bold;
    margin-bottom: 25px;
    margin-top: 0;
  }

  h1 {
    font-size: 1.4em;
  }

  p {
    line-height: 1.5;
    margin-bottom: 25px;
    margin-top: 0;
  }
`;

export default GlobalStyle;
