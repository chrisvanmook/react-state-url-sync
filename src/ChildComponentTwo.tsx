import React from 'react'
import useParamState from './useParamState'
import { params } from './URLParam'

const ChildComponentTwo = () => {
  const [state, setState] = useParamState<number>(params.zoomParam)
  return (
    <div>
      <button
        onClick={() => {
          if (state) {
            setState(state + 1)
          }
        }}
      >
        zoom in
      </button>
      <button
        onClick={() => {
          if (state) {
            setState(state - 1, 'replaceState')
          }
        }}
      >
        zoom out
      </button>
      <h1>{state}</h1>
    </div>
  )
}

export default ChildComponentTwo
