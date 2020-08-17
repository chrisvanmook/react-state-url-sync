import React, { useEffect } from 'react'
import { useParam } from 'react-router-query-sync'
import { complexParam, countParam } from './params'

const ChildComponentTwo = () => {
  const [complex, setComplex] = useParam(complexParam)
  const [count, setCount] = useParam(countParam)

  useEffect(() => {
    setTimeout(() => {
      setComplex([
        [52.3673155, 4.9004335],
        [52.3673155, 4.9004335],
      ])
      setCount(count + 1)
    }, 2000)

    setTimeout(() => {
      setComplex([
        [52.3673155, 4.9004335],
        [52.3673155, 4.9004335],
      ])
      setCount(13)
    }, 4000)
  }, [])
  return (
    <div>
      {complex.map((val) => (
        <p>{val.toString()}</p>
      ))}
      <button
        type="button"
        onClick={() =>
          setComplex([
            [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
            [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)],
          ])
        }
      >
        Set complex val
      </button>
    </div>
  )
}

export default ChildComponentTwo
