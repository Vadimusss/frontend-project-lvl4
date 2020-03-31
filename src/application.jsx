import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Chat from './components/Chat';
import reducers from './reducers';

export default (initState) => {
  const store = createStore(reducers, initState);

  render (
    <Provider store={store}>
      <Chat />
    </Provider>,
    document.getElementById('chat'),
  );
};