import React from 'react'
import { URLSyncStateProvider } from './URLSyncStateContext'
import ChildComponent from './ChildComponent'
import ChildComponentTwo from './ChildComponentTwo'

function App() {
  return (
    <URLSyncStateProvider>
      <ChildComponent />
      <ChildComponentTwo />
    </URLSyncStateProvider>
  )
}

export default App
