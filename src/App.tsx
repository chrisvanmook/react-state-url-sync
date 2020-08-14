import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { countParam } from './params';
import useParam from './useParam';

function App() {
  return (
    <Router>
      <Count />
    </Router>
  )
}

function Count() {
  const [count, setCount] = useParam(countParam)

  return (
    <>
      <p>The count is: {count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>Increase count</button>
      <button type="button" onClick={() => setCount(count - 1)}>Decrease count</button>
    </>
  )
}

export default App
