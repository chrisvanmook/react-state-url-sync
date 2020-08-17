import { UrlParam } from 'react-router-query-sync/lib/useParam'

export const countParam: UrlParam<number> = {
  name: 'count',
  defaultValue: 0,
  encode: (value) => value.toString(),
  decode: (value) => parseInt(value, 10),
}

export const complexParam: UrlParam<[[number, number], [number, number]]> = {
  name: 'complex',
  defaultValue: [
    [1, 1],
    [2, 2],
  ],
  encode: (value) => JSON.stringify(value),
  decode: (value) => JSON.parse(value),
}
