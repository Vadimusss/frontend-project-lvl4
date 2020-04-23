import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import Layout from './components/Layout';
import { channelsReduser, messagesReduser, currentChannelIdReduser } from './reducers';
import { receivingMessage } from './actions';
import UserNameContext from './context'; 

export default (initState, socket, userName) => {
  const store = configureStore({
    reducer: {
      channels: channelsReduser,
      messages: messagesReduser,
      currentChannelId: currentChannelIdReduser,
    },
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initState,
  });

  socket.on('newMessage', function (data) {
    const { data: { attributes } } = data;
    store.dispatch(receivingMessage(attributes));
  });

  render(
    <Provider store={store}>
      <UserNameContext.Provider value={userName}>
        <Layout />
      </UserNameContext.Provider>,
    </Provider>,
    document.getElementById('chat'),
  );
};