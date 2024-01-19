/* eslint-disable */

const ports = [];
const latestState = {};

export const postMessageAll = (msg, excluded_port = null) => {
  ports.forEach((port) => {
    if (port === excluded_port) {
      return;
    }
    port.postMessage(msg);
  });
};

onconnect = (e) => {
  const port = e.ports[0];
  ports.push(port);
};

port.onmessage = (e) => {
  if (e.data.type === 'set_state') {
    latestState[e.data.id] = e.data.state;
    
    postMessageAll(
      {
        type: 'set_state',
        id: e.data.id,
        state: latestState[e.data.id],
      },
      port,
    );
  }
  if (e.data.type === 'get_state') {
    port.postMessageAll({
      type: 'set_state',
      id: e.data.id,
      state: latestState[e.data.id],
    });
  }
};
