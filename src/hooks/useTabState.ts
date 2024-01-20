import {useState, useEffect} from 'react';

export default function useTabState<T>(
  initialState: T,
  id: string,
): [T, (newState: T) => void] {
  const [localState, setLocalState] = useState<T>(initialState);

  const worker = new SharedWorker(
    new URL('../worker/worker.ts', import.meta.url),
  );

  const setTabState = (newState: T) => {
    setLocalState(newState);
    worker.port.postMessage({
      type: 'setState',
      id,
      state: newState,
    });
  };

  useEffect(() => {
    worker.port.addEventListener('message', (e) => {
      console.log('message', e);
      if (!e.data?.type) {
        return;
      }

      switch (e.data.type) {
        case 'setState': {
          if (e.data.id == id) {
            if (e.data.state) {
              setLocalState(e.data.state);
            } else {
              setLocalState(initialState);
            }
          }
        }
      }
    });

    worker.port.start();

    worker.port.postMessage({
      type: 'getState',
      id,
    });
  }, []);

  return [localState, setTabState];
}
