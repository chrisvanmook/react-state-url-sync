import { useCallback, useEffect, useMemo, useState } from 'react'
import { URLParam } from './URLParam'

type SetValueFn<T> = (newValue: T, type?: 'pushState' | 'replaceState') => void

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

const useParamState = <T>(urlParam: URLParam<T>): [T, SetValueFn<T>] => {
  const { search, setSearch } = useLocationSearch()

  const params = useMemo(() => new URLSearchParams(search), [search])

  const rawValue = params.get(urlParam.name) as string
  const value = useMemo(() => urlParam.decode(rawValue) || urlParam.defaultValue, [rawValue])

  const setState: SetValueFn<T> = (newValue, type = 'pushState') => {
    const newState = urlParam.defaultValue === newValue ? null : urlParam.encode(newValue)
    if (newState) {
      params.set(urlParam.name, newState)
    } else {
      params.delete(urlParam.name)
    }
    window.history[type](null, '', `?${params.toString()}`)
    setSearch(window.location.search)
  }

  return [value, setState]
}

export default useParamState
