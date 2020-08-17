import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import ChildComponentTwo from './ChildComponentTwo'
import ChildComponent from './ChildComponent'

function App() {
  return (
    <Router>
      <Count />
    </Router>
  )
}

function Count() {
  return (
    <>
      <ChildComponent />
      <ChildComponentTwo />
    </>
  )
}

export default App
