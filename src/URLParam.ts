export interface URLParam<T> {
  name: string
  defaultValue: T
  encode: (value: T) => string | null
  decode: (value: string) => T
}

const zoomParam: URLParam<number> = {
  name: 'zoom',
  defaultValue: 18,
  encode: (value: any) => value.toString(),
  decode: (value: string) => parseInt(value, 10),
}

const params = {
  zoomParam,
}

export { params }
