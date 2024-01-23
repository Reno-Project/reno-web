/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useRef } from 'react';
import { debounce } from 'lodash';

export function useDebouncedCallback(fn, delay, options) {
  // for cancellation
  const debFnRef = useRef(null);

  const fnRef = useRef(fn);
  fnRef.current = fn;

  const debouncedFn = useMemo(() => {
    if (debFnRef.current) {
      debFnRef.current.cancel();
      debFnRef.current = null;
    }

    const newDebFb = debounce(
      (...args) => fnRef.current(...args),
      delay,
      options
    );

    debFnRef.current = newDebFb;

    return newDebFb;
  }, [delay, options?.leading, options?.trailing, options?.maxWait]);

  return debouncedFn;
}
