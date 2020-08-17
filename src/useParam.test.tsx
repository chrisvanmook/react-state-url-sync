import React from 'react'
import * as reactRouterDom from 'react-router-dom'
import { act, renderHook } from '@testing-library/react-hooks'
import useParam from './useParam'
import { UrlParam } from './params'

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(() => ({
    push: jest.fn(),
  })),
  useLocation: jest.fn(() => ({
    search: '',
  })),
}))

const countParam: UrlParam<number> = {
  name: 'count',
  defaultValue: 2,
  showDefaultValueInQuery: true,
  encode: (value) => value.toString(),
  decode: (value) => parseInt(value, 10),
}

const complexParam: UrlParam<[[number, number], [number, number]]> = {
  name: 'complex',
  defaultValue: [
    [1, 1],
    [2, 2],
  ],
  encode: (value) => JSON.stringify(value),
  decode: (value) => JSON.parse(value),
}

describe('useParam hook', () => {
  let historyPushMock = jest.fn()
  let historyReplaceMock = jest.fn()

  beforeEach(() => {
    historyPushMock = jest.fn()
    historyReplaceMock = jest.fn()

    jest.spyOn(reactRouterDom, 'useHistory').mockImplementation(
      () =>
        ({
          push: historyPushMock,
          replace: historyReplaceMock,
        } as any),
    )
  })

  it("should push or replace a new URL query to the browser's session history stack", () => {
    const { result } = renderHook(() => useParam(countParam))
    const [count, setCount] = result.current

    act(() => {
      setCount(count + 1)
    })

    expect(historyPushMock).toHaveBeenNthCalledWith(1, { search: 'count=3' })
    expect(historyReplaceMock).not.toHaveBeenCalled()

    act(() => {
      setCount(count - 1, 'replace')
    })

    // Because we mock useLocation, the query param will always be the default value (2)
    expect(historyReplaceMock).toHaveBeenNthCalledWith(1, { search: 'count=1' })
  })

  it('should return the default value of the URLParam, when no query is set', () => {
    const { result: countResult } = renderHook(() => useParam(countParam))
    const { result: complexResult } = renderHook(() => useParam(complexParam))
    const [count] = countResult.current
    const [complex] = complexResult.current

    expect(count).toBe(2)
    expect(complex).toStrictEqual([
      [1, 1],
      [2, 2],
    ])
  })

  it('should return a decoded value of the URLParam, derived from the URL', () => {
    jest.spyOn(reactRouterDom, 'useLocation').mockImplementation(
      () =>
        ({
          search: '?complex=[[3,3],[4,4]]',
        } as any),
    )
    const { result } = renderHook(() => useParam(complexParam))
    const [complex] = result.current
    expect(complex).toStrictEqual([
      [3, 3],
      [4, 4],
    ])
  })

  it('should perform a deep equal comparison between the new value to be set, and the default value of the URLParam', () => {
    jest.spyOn(reactRouterDom, 'useLocation').mockImplementation(
      () =>
        ({
          search: '?complex=[[3,3],[4,4]]&count=4',
        } as any),
    )
    const { result: complexResult } = renderHook(() => useParam(complexParam))
    const [, setComplex] = complexResult.current

    // Set the default value
    act(() => {
      setComplex([
        [1, 1],
        [2, 2],
      ])
    })

    // If the value is equal to the default value, it should remove the query from the URL
    expect(historyPushMock).toHaveBeenNthCalledWith(1, { search: 'count=4' })

    // It should update the complex param if it's not the default value
    act(() => {
      setComplex([
        [66, 66],
        [66, 66],
      ])
    })

    expect(historyPushMock).toHaveBeenNthCalledWith(2, {
      search: 'complex=%5B%5B66%2C66%5D%2C%5B66%2C66%5D%5D&count=4',
    })
  })

  it('should be able to show the default value in the URL when updating it', () => {
    jest.spyOn(reactRouterDom, 'useLocation').mockImplementation(
      () =>
        ({
          search: '?count=3',
        } as any),
    )
    const { result } = renderHook(() => useParam(countParam))
    const [count, setCount] = result.current

    act(() => {
      setCount(count - 1)
    })

    expect(historyPushMock).toHaveBeenNthCalledWith(1, {
      search: 'count=2',
    })
  })
})
