import React, { createContext } from 'react'
import useLocationSearch from './useLocationSearch'

const URLSyncStateContext = createContext({
  search: {},
  setSearch: (val: any) => {},
})

const URLSyncStateProvider: React.FC = ({ children }) => {
  const { search, setSearch } = useLocationSearch()

  return (
    <URLSyncStateContext.Provider value={{ search, setSearch }}>
      {children}
    </URLSyncStateContext.Provider>
  )
}

export { URLSyncStateContext, URLSyncStateProvider }
