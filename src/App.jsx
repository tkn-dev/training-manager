/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { reset } from './style/reset';
import Header from './components/header/Header';
import SideMenu from './components/header/SideMenu';
import ExercisesIndex from './features/exercises/ExercisesIndex';
import RecordsIndex from './features/records/RecordsIndex';
import HistoriesIndex from './features/histories/HistoriesIndex';

const index = css`
  html {
    height: 100%;
    font-size: 62.5%;
    pointer-events: none;
  }

  body {
    height: 100%;
    color: #333;
    font-size: 1.2rem;
    font-family: 'Hiragino Kaku Gothic ProN', 'Meyrio', sans-serif;
    pointer-events: none;
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
    pointer-events: none;
  }
`;

const main = css({
  marginLeft: '80px',
  pointerEvents: 'auto',
});

export default function App() {
  return (
    <>
      <Global styles={(reset, index)} />
      <Header />
      <SideMenu />
      <main css={main}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ExercisesIndex />} />
            <Route path="/exercises" element={<ExercisesIndex />} />
            <Route path="/records" element={<RecordsIndex />} />
            <Route path="/histories" element={<HistoriesIndex />} />
            <Route path="*" element={<ExercisesIndex />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}
