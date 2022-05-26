import { css } from '@emotion/react';

export const index = css`
  html {
    height: 100%;
    font-size: 62.5%;
  }

  body {
    height: 100%;
    color: #333;
    font-size: 1.2rem;
    font-family: 'Noto Sans Japanese', sans-serif;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .hidden {
    visibility: hidden;
  }

  #root {
    height: 100%;
  }
`;
