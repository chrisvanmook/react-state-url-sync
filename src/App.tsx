import React from 'react'
import { URLSyncStateProvider } from './URLSyncStateContext'
import ChildComponent from './ChildComponent'

function App() {
  return (
    <URLSyncStateProvider>
      <ChildComponent />
    </URLSyncStateProvider>
  )
}

export default App
