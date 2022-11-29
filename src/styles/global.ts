import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --black: #000000;
    --black: #000000;
    --grey-900: #121214;
    --grey-700: #202024;
    --grey-600: #D9D9D9;
    --grey-400: #7c7c8a;
    --grey-200: #c4c4cc;
    --grey-100: #e1e1e6;
    --cyan-500: #81d8f7;
    --cyan-300: #a9e7fc;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    padding: 0;
    margin: 0;
    outline: none;
    box-sizing: border-box;
  }
`;
