import deepEqual from 'deep-equal'
import { useHistory, useLocation } from 'react-router-dom'

type SetValueFn<T> = (value: T, method?: 'push' | 'replace') => void

export interface UrlParam<T> {
  name: string
  defaultValue: T
  encode: (value: T) => string
  decode: (value: string) => T
  showDefaultValueInQuery?: boolean
}

const useParam = <T>(urlParam: UrlParam<T>): [T, SetValueFn<T>] => {
  const history = useHistory()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const rawValue = params.get(urlParam.name)

  const setValue: SetValueFn<T> = (value, method = 'push') => {
    const encodedValue = urlParam.encode(value)

    // Check if we don't want to show the default value in the URL
    const newValue =
      !urlParam.showDefaultValueInQuery && deepEqual(urlParam.defaultValue, value)
        ? null
        : encodedValue

    if (newValue) {
      params.set(urlParam.name, newValue)
    } else {
      params.delete(urlParam.name)
    }

    // We don't want the order to change, so always sort them before updating the URL
    params.sort()

    history[method]({ ...location, search: params.toString() })
  }

  return [rawValue ? urlParam.decode(rawValue) : urlParam.defaultValue, setValue]
}

export default useParam
