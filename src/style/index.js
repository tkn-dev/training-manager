import { css } from '@emotion/react';
import { COLOR } from './constants';

export const index = css`
  html {
    height: 100%;
    font-size: 62.5%;
  }

  body {
    height: 100%;
    color: #333;
    font-size: 1.2rem;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    font-family: 'Noto Sans Japanese', sans-serif;
  }

  .hidden {
    visibility: hidden;
  }

  #root {
    height: 100%;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: ${COLOR.SCROLL_TRACK};
  }

  ::-webkit-scrollbar-thumb {
    border: none;
    border-radius: 10px;
    background: ${COLOR.SCROLL_THUMB}
  }
`;
