import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}
  html {
  height: 100%;
  font-family: 'Roboto', sans-serif;
}
  body {
  margin: 0;
  position: relative;
  height: 100%;
  background: #f5f5f5;
  }
#root {
  height: 100%;
  position: relative;

}
`;
export default GlobalStyle;
