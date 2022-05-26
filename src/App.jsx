/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/header/Header';
import { SideMenu } from './components/header/SideMenu';
import { ExercisesIndex } from './features/exercises/ExercisesIndex';
import { RecordsIndex } from './features/records/RecordsIndex';
import { HistoriesIndex } from './features/histories/HistoriesIndex';

const main = (sideMenuOpen) =>
  css({
    marginLeft: sideMenuOpen ? '130px' : '30px',
    pointerEvents: 'auto',
    transition: '0.3s',
  });

export default function App() {
  const [sideMenuOpen, setSideMenuOpen] = useState(true);

  return (
    <div>
      <Header setSideMenuOpen={setSideMenuOpen} />
      <SideMenu sideMenuOpen={sideMenuOpen} />
      <main css={main(sideMenuOpen)}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ExercisesIndex />} />
            <Route path="/exercises" element={<ExercisesIndex />} />
            <Route path="/records" element={<RecordsIndex />} />
            <Route path="/histories" element={<HistoriesIndex />} />
            {/* TODO: 404ページにする */}
            <Route path="*" element={<ExercisesIndex />} />
          </Routes>
        </BrowserRouter>
      </main>
    </div>
  );
}
