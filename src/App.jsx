import React from 'react'
import { Outlet } from 'react-router-dom'
import './App.css';
import './index.css';
import Navbar from './components/Navbar'
import Banner from './components/Banner';

function App(){
  return (
    <>
    <Navbar/>
    <Outlet/>
    <footer> </footer>
    

    </>
  )

}

export default App