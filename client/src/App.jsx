import React from 'react'
import Home from './pages/Home'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <main>
      <Home />
      <ToastContainer />
    </main>
  )
}