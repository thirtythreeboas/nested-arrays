/* eslint-disable */


import {useState, useEffect} from 'react';

export default function useTabState<T>(
  initial_state: T,
  id: string,
): [T, (newState: T) => void] {
  const [localState, setLocalState] = useState<T>();

  const setTabState = (newState: T) => {
    setLocalState(newState);
    worker.port.postMessage({
      type: 'set_state',
      id,
      state: newState,
    });
  };

  useEffect(() => {
    worker.port.addEventListener('message', (e) => {
      if (!e.data?.type) {
        return;
      }

      switch (e.data.type) {
        case 'set_state': {
          if (e.data.id == id) {
            if (e.data.state) {
              setLocalState(e.data.state);
            } else {
              setLocalState(initial_state);
            }
          }
        }
      }
    });

    worker.port.start();

    worker.port.postMessage({
      type: 'get_state',
      id,
    });
  }, []);

  return [localState, setTabState];
}
