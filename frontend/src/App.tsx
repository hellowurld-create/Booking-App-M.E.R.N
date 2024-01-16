import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layouts } from './layout/Layouts';
import Register from './pages/Register'
import Login from './pages/Login';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Layouts>
          <p>Home Page</p>
        </Layouts>
        } />

        <Route path='/search' element={
          <Layouts>
          <p>Search Page</p>
        </Layouts>
        } />
        <Route path='register' element={<Register />} />
        <Route path='/sign-in' element={ <Login /> } />
        <Route path='*' element={<Navigate to='/'/>}/>
      </Routes>
    </BrowserRouter>
  )
}
