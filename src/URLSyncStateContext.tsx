import React, { createContext, useEffect, useReducer } from 'react'
import { params, URLParam } from './URLParam'

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'updateState':
      return {
        [action.payload.key]: action.payload.value,
      }
    case 'setEntireState':
      return action.payload
    default:
      throw new Error()
  }
}

const urlParams = new URLSearchParams(window.location.search)
const initialState = Object.values(params).reduce(
  (acc, param: URLParam<any>) => ({
    ...acc,
    [param.name]: urlParams.get(param.name)
      ? param.decode(urlParams.get(param.name) || '')
      : param.defaultValue,
  }),
  {},
)

const URLSyncStateContext = createContext({
  updateState: (key: string, value: any) => {},
  state: {},
})

const URLSyncStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Sync to state
  const updateState = (key: string, value: any) => {
    dispatch({
      type: 'updateState',
      payload: {
        key,
        value,
      },
    })
  }

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <URLSyncStateContext.Provider value={{ updateState, state }}>
      {children}
    </URLSyncStateContext.Provider>
  )
}

export { URLSyncStateContext, URLSyncStateProvider }
