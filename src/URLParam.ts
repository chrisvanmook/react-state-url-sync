export interface URLParam<T> {
  name: string
  defaultValue: T
  encode: (value: T) => string | null
  decode: (value: string) => T | null
}

const zoomParam: URLParam<number> = {
  name: 'zoom',
  defaultValue: 18,
  encode: (value: any) => {
    return value.toString()
  },
  decode: (value: string) => {
    const result = parseInt(value, 10)
    if (Number.isNaN(result)) {
      return null
    }
    return result
  },
}

const params = {
  zoomParam,
}

export { params }
