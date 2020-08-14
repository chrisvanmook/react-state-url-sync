export interface UrlParam<T> {
  name: string
  defaultValue: T
  encode: (value: T) => string
  decode: (value: string) => T
}

export const countParam: UrlParam<number> = {
  name: 'count',
  defaultValue: 0,
  encode: (value) => value.toString(),
  decode: (value) => parseInt(value, 10),
}
