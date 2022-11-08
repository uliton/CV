import React from "react";
import { Route, Routes } from "react-router";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { NotFound } from "./components/NotFound";
// import { Introduce } from "./components/Introduce";
// import { Portfolio } from "./components/Portfolio";
import { Contacts } from "./components/Contacts";
import { Footer } from "./components/Footer";
import { Tests } from "./components/Tests";
// import { OtherProjects } from "./components/OtherProjects";

export const App: React.FC = () => (
  <div className="app">
    <Header />

    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/cv" element={<Main />} />
      {/* <Route path="/introduce" element={<Introduce />} /> */}
      {/* <Route path="/portfolio" element={<Portfolio />} /> */}
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/tests" element={<Tests />} />
      <Route path="*" element={<NotFound />} />
    </Routes>

    <Footer />
  </div>
);
