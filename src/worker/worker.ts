interface ILatestState {
  [id: string]: string;
}

const ports: MessagePort[] = [];
const latestState: ILatestState = {};

const postMessageAll = (msg: any, excludedPort: MessagePort | null = null) => {
  ports.forEach((port) => {
    if (port === excludedPort) {
      return;
    }
    port.postMessage(msg);
  });
};

onconnect = (e) => {
  // console.log('onconnect', e);
  const port = e.ports[0];
  ports.push(port);
  port.onmessage = (e) => {
    console.log('port.onmessage', e);
    if (e.data.type === 'setState') {
      console.log(e.data.state);
      latestState[e.data.id] = e.data.state;

      postMessageAll(
        {
          type: 'setState',
          id: e.data.id,
          state: latestState[e.data.id],
        },
        port,
      );
    }
    if (e.data.type === 'getState') {
      postMessageAll({
        type: 'setState',
        id: e.data.id,
        state: latestState[e.data.id],
      });
    }
  };
};
