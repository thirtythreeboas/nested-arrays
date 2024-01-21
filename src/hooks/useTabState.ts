import {useState, useEffect, useCallback} from 'react';

export default function useTabState(id: number): [number, number, () => void] {
  const [orderNumber, setOrderNumber] = useState<number>(1);
  const [totalNumberOfTabs, setTotalNumberOfTabs] = useState<number>(1);
  
  const worker = new SharedWorker(
    new URL('../worker/worker.ts', import.meta.url),
  );

  const setPageId = useCallback(() => {
    console.log('useCallback', id);
    worker.port.postMessage({
      type: 'SET_STATE',
      id,
    });
  }, [])
  console.log('initial hook', orderNumber);
  useEffect(() => {
    setPageId();
    worker.port.addEventListener('message', (e) => {
      switch (e.data.type) {
        case 'SET_ORDER_NUMBER': {
          setOrderNumber(e.data.index);
          break;
        }
        case 'SET_TABS_LENGTH': {
          setTotalNumberOfTabs(e.data.length);
          break
        }
        default:
          break;
      }
    });

    worker.port.start();
  }, []);
  console.log('changed hook', orderNumber);
  return [orderNumber, totalNumberOfTabs, setPageId];
}
