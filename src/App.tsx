import React from "react";
import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { NotFound } from "./components/NotFound";
// import { Introduce } from "./components/Introduce";
// import { Portfolio } from "./components/Portfolio";
import { Contacts } from "./components/Contacts";
// import { OtherProjects } from "./components/OtherProjects";

import './App.scss';

export const App: React.FC = () => (
  <div>
    <Header />

    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/cv" element={<Main />} />
      {/* <Route path="/introduce" element={<Introduce />} /> */}
      {/* <Route path="/portfolio" element={<Portfolio />} /> */}
      <Route path="/contacts" element={<Contacts />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  </div>
);
