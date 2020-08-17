import { UrlParam } from './useParam'

export const countParam: UrlParam<number> = {
  name: 'count',
  defaultValue: 0,
  encode: (value) => value.toString(),
  decode: (value) => parseInt(value, 10),
}
