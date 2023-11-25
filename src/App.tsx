import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Route, Routes } from 'react-router';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

import { Season, getCurrentClassNames, setMetaThemeColor } from './styles/styles';
import { Context, getCurrentSeason } from './context/season';
import style from './App.module.scss';
import { NotFound } from './components/NotFound';
import { Contacts } from './components/Contacts';
import { Work } from './components/Work';

export const App: React.FC = () => {
  const [season, setSeason] = useState<Season>(Season.winter);

  useEffect(() => {
    getCurrentSeason(setSeason);

    // Оновлюємо колір у метатегу при зміні сезону
    setMetaThemeColor(season);
  }, [season]);

  return (
    <Context.Provider value={season}>
      <div className={classNames(getCurrentClassNames(style, 'app', season))}>
        <div>
          {season === Season.winter && (
            <div className={style.snow}></div>
          )}
        </div>

        <Header />

        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/work' element={<Work />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='*' element={<NotFound />} />
          {/* <Route path="/portfolio" element={<Portfolio />} /> */}

        </Routes>

        <div style={{height: '24px'}}></div>

        <Footer />
      </div>
    </Context.Provider>
  );
};
