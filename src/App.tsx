import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Route, Routes } from 'react-router';

import { Header } from './components/Header';
import { Main } from './components/Main';
import { Work } from './components/Work';
import { Contacts } from './components/Contacts';
import { Footer } from './components/Footer';
import { NotFound } from './components/NotFound';

import { Context, getCurrentSeason } from './context/season';
import { Season, getCurrentClassNames, setMetaThemeColor } from './styles/styles';
import style from './App.module.scss';

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
        {season === Season.winter && (
          <div>
            {season === Season.winter && (
              <div className={style.snow}></div>
            )}
          </div>
        )}

        <Header />

        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/work' element={<Work />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <div style={{height: '24px'}}></div>

        <Footer />
      </div>
    </Context.Provider>
  );
};
