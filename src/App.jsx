/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import SideMenu from './components/header/SideMenu';
import ExercisesIndex from './features/exercises/ExercisesIndex';
import RecordsIndex from './features/records/RecordsIndex';
import HistoriesIndex from './features/histories/HistoriesIndex';

const main = css({
  marginLeft: '80px',
  pointerEvents: 'auto',
});

export default function App() {
  return (
    <>
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
