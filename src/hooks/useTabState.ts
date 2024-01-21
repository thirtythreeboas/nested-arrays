import {useState, useEffect} from 'react';

const bc = new BroadcastChannel('tabs-state');

export default function useTabState() {
  const [pageId, setPageId] = useState<number>(0);
  const [totalNumberOfTabs, setTotalNumberOfTabs] = useState<number[]>([]);

  const newPageId = new Date().getTime();
  const broadcastPageId = () => {
    setPageId(newPageId);
    setTotalNumberOfTabs((prevState) => [...prevState, newPageId]);
    bc.postMessage({id: newPageId});
  };

  useEffect(() => {
    if (pageId === 0) broadcastPageId();

    const handleMessage = (e: MessageEvent) => {
      console.log(e.data.id, totalNumberOfTabs);
      if (!totalNumberOfTabs.includes(e.data.id)) {
        setTotalNumberOfTabs((prevState) => [...prevState, e.data.id]);
        bc.postMessage({id: pageId});
      }
    };

    bc.addEventListener('message', handleMessage);

    return () => {
      bc.removeEventListener('message', handleMessage);
    };
  }, [pageId, totalNumberOfTabs]);

  return [totalNumberOfTabs.indexOf(pageId) + 1, totalNumberOfTabs.length];
}
