import React from 'react';
import { Route, Routes } from 'react-router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NotFound } from './components/NotFound';
import { OtherProjects } from './components/OtherProjects';

export const App: React.FC = () => (
  <>
    <Header />

    <Routes>
      <Route path="/" element={<OtherProjects />} />
      <Route path="/cv/" element={<OtherProjects />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

    <Footer /> 
  </>
);
