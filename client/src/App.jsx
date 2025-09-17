import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { CharactersPage } from './pages/CharactersPage';
import { WeaponsPage } from './pages/WeaponsPage';
import { MapsPage } from './pages/MapsPage';
import { GuidesPage } from './pages/GuidesPage';
import { NewsPage } from './pages/NewsPage';
import { MainLayout } from './layouts/MainLayout';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/characters' element={<CharactersPage />} />
          <Route path='/weapons' element={<WeaponsPage />} />
          <Route path='/maps' element={<MapsPage />} />
          <Route path='/guides' element={<GuidesPage />} />
          <Route path='/news' element={<NewsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
