/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layouts/Header';
import SideMenu from './components/layouts/SideMenu';
import ExercisesIndex from './features/exercises/ExercisesIndex';

const temp = css({
  marginLeft: '80px',
});

export default function App() {
  return (
    <>
      <Header />
      <SideMenu />
      <main css={temp}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ExercisesIndex />} />
            <Route path="*" element={<ExercisesIndex />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}
