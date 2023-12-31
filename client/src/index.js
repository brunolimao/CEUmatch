import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './user/pages/login';
import Register from './user/pages/register'
import Profile from './user/pages/profile'
import Teste from './user/pages/teste'
import Matches from './match/pages/matches'
import UserMatches from './match/pages/userMatches'
import CreateMatch from './match/pages/createMatch'
import UpdateMatch from './match/pages/updateMatch';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/users/welcome" element={<Teste />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/users/profile/:id" element={<Profile />}/>
        <Route path="/matches" element={<Matches />}/>
        <Route path="/matches/usermatches" element={<UserMatches />}/>
        <Route path="/matches/creatematch" element={<CreateMatch />}/>
        <Route path="/matches/updatematch/:id" element={<UpdateMatch />}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
