import { useContext, useMemo } from 'react'
import { URLParam } from './URLParam'
import { URLSyncStateContext } from './URLSyncStateContext'

type SetValueFn<T> = (newValue: T, type?: 'pushState' | 'replaceState') => void

const useParamState = <T>(urlParam: URLParam<T>): [T | null, SetValueFn<T>] => {
  const { search, setSearch } = useContext(URLSyncStateContext)

  const params = useMemo(() => new URLSearchParams(search), [search])

  const rawValue = params.get(urlParam.name)
  const value = useMemo(() => (rawValue ? urlParam.decode(rawValue) : urlParam.defaultValue), [
    rawValue,
    urlParam,
  ])

  const setState: SetValueFn<T | null> = (newValue, type = 'pushState') => {
    const newState =
      urlParam.defaultValue === newValue || !newValue ? null : urlParam.encode(newValue)
    if (newState) {
      params.set(urlParam.name, newState)
    } else {
      params.delete(urlParam.name)
    }
    const url = params.toString()
    window.history[type](null, '', url ? `?${url}` : '/')
    setSearch(window.location.search)
  }

  return [value, setState]
}

export default useParamState
