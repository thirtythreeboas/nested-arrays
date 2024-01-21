import {useState, useEffect} from 'react';

const bc = new BroadcastChannel('tabs-state');

export default function useTabState() {
  const [pageId, setPageId] = useState<number>(0);
  const [totalNumberOfTabs, setTotalNumberOfTabs] = useState<number[]>([]);

  const newPageId = new Date().getTime();
  const broadcastPageId = () => {
    setPageId(newPageId);
    setTotalNumberOfTabs((prevState) => [...prevState, newPageId]);
    bc.postMessage({action: 'add', id: newPageId});
  };

  useEffect(() => {
    if (pageId === 0) broadcastPageId();

    const handleMessage = (e: MessageEvent) => {
      switch (e.data.action) {
        case 'add': {
          if (!totalNumberOfTabs.includes(e.data.id)) {
            setTotalNumberOfTabs((prevState) =>
              [...prevState, e.data.id].sort((a, b) => a - b),
            );
            bc.postMessage({action: 'add', id: pageId});
          }
          break;
        }
        case 'close': {
          setTotalNumberOfTabs((prevState) =>
            prevState.filter((id) => id !== e.data.id),
          );
          break;
        }
        default:
          break;
      }
    };

    const handleTabClosed = () => {
      setTotalNumberOfTabs((prevState) =>
        prevState.filter((id) => id !== pageId),
      );
      bc.postMessage({action: 'close', id: pageId});
    };
    console.log(totalNumberOfTabs, pageId);
    bc.addEventListener('message', handleMessage);
    window.addEventListener('unload', handleTabClosed);

    return () => {
      bc.removeEventListener('message', handleMessage);
      window.removeEventListener('unload', handleTabClosed);
    };
  }, [pageId, totalNumberOfTabs]);

  const tabIndex = totalNumberOfTabs.indexOf(pageId) + 1;
  const totalTabs = totalNumberOfTabs.length;

  return [tabIndex, totalTabs];
}
