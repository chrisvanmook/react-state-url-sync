import React from 'react'
import { useParam } from 'react-router-query-sync'
import { countParam } from './params'

const ChildComponentTwo = () => {
  const [count, setCount] = useParam(countParam)
  return (
    <div>
      <p>The count is: {count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Increase count
      </button>
      <button type="button" onClick={() => setCount(count - 1)}>
        Decrease count
      </button>
    </div>
  )
}

export default ChildComponentTwo
