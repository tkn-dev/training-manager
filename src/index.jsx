import { css, jsx, Global } from '@emotion/react';
import React from 'react';
import { render } from 'react-dom';
import { reset } from './style/reset';
import { index } from './style/index';
import App from './App';

const rootElement = document.getElementById('root');
render(
  <>
    <Global styles={reset} />
    <Global styles={index} />

    <App />
  </>,
  rootElement,
);
