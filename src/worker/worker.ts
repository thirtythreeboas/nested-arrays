const ports: MessagePort[] = [];
const totalTabs: number[] = [];

const postMessageAll = (msg: any, port: MessagePort | null = null) => {
  ports.forEach((port) => port.postMessage(msg));
};

onconnect = (e) => {
  const port = e.ports[0];
  ports.push(port);
  console.log(ports);
  port.onmessage = (e) => {
    console.log('got new data', e.data.type);
    switch (e.data.type) {
      case 'SET_STATE': {
        totalTabs.push(e.data.id);
        const tabIndex = totalTabs.indexOf(e.data.id) + 1;
        port.postMessage({type: 'SET_ORDER_NUMBER',index: tabIndex});
        break;
      }
      default:
        break;
    }
    postMessageAll({type: 'SET_TABS_LENGTH', length: totalTabs.length});
  };
};
