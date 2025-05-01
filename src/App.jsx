import { useState } from 'react'
import './App.css'
import Add from './components/add-Appointment/Add'
import List from './components/list-appointement/List'

function App() {


  return (
    <>
      <header>
        <h1>Appointment Management System</h1>
      </header>
      <main>
        <Add />
        <List />
      </main>

    </>
  )
}

export default App
