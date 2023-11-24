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

export const App: React.FC = () => {
  const [season, setSeason] = useState<Season>(Season.winter);

  useEffect(() => {
    getCurrentSeason(setSeason);

    // Оновлюємо колір у метатегу при зміні сезону
    setMetaThemeColor(season);
  }, [season]);

  console.log(style['app--winter'])

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
          <Route path='/introduce' element={<Main />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </Context.Provider>
  );
};
