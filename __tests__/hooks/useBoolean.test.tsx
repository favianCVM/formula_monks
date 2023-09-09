import React from 'react';
import {renderHook} from '@testing-library/react-hooks';
import {useBoolean} from '../../hooks/useBoolean';
import {act} from 'react-test-renderer';

describe('useBoolean hook', () => {
  it('should return a given initial value - false ', () => {
    const {result} = renderHook(() => useBoolean(false));

    expect(result.current[0]).toBeFalsy();
  });

  it('should return a given initial value - true ', () => {
    const {result} = renderHook(() => useBoolean(true));

    expect(result.current[0]).toBeTruthy();
  });

  it('should return a given initial value and then toggle it', () => {
    const {result} = renderHook(() => useBoolean(true));

    expect(result.current[0]).toBeTruthy();

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBeFalsy();
  });
});
