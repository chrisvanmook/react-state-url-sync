import deepEqual from 'deep-equal';
import { useHistory, useLocation } from 'react-router-dom';
import { UrlParam } from './params';

type SetValueFn<T> = (value: T, method?: 'push' | 'replace') => void

const useParam = <T>(urlParam: UrlParam<T>): [T, SetValueFn<T>] => {
  const history = useHistory()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const rawValue = params.get(urlParam.name)

  const setValue: SetValueFn<T> = (value, method = 'push') => {
    const encodedValue = urlParam.encode(value)
    const newValue = deepEqual(urlParam.defaultValue, encodedValue) ? null : encodedValue

    if (newValue) {
      params.set(urlParam.name, newValue)
    } else {
      params.delete(urlParam.name)
    }

    history[method]({ ...location, search: params.toString() })
  }

  return [rawValue ? urlParam.decode(rawValue) : urlParam.defaultValue, setValue]
}

export default useParam
