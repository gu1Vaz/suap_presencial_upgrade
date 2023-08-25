import React from 'react';
import { Route, Routes } from "react-router-dom";
import Wrapper from './Route';
import Main from '../pages/Main';

export default function Rotas() {
    return (
        <Routes>
           <Route path="/"  exact element={<Wrapper component={Main}/>}/>
        </Routes>
    );
}