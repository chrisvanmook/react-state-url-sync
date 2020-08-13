import { useEffect, useState } from 'react'

const useLocationSearch = () => {
  const [search, setSearch] = useState(window.location.search)

  const eventHandler = () => {
    setSearch(window.location.search)
  }

  useEffect(() => {
    window.addEventListener('popstate', eventHandler)

    return () => {
      window.addEventListener('popstate', eventHandler)
    }
  }, [])

  return { search, setSearch }
}

export default useLocationSearch
