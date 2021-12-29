import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExercisesIndex from './features/exercises/ExercisesIndex';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ExercisesIndex />} />
        <Route path="*" element={<ExercisesIndex />} />
      </Routes>
    </BrowserRouter>
  );
}
