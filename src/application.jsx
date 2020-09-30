import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Layout from './components/Layout.jsx';
import UserNameContext from './context';
import './locales';
import { redusers, actions } from './slices';

export default (initState, socket, userName) => {
  const store = configureStore({
    reducer: redusers,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initState,
  });

  const {
    receivingMessage,
    receivingNewChannel,
    receivingRemoveChannel,
    receivingRenameChannel,
    changeCurrentChannel,
  } = actions;

  socket.on('newMessage', (data) => {
    const { data: { attributes } } = data;
    store.dispatch(receivingMessage(attributes));
  });

  socket.on('newChannel', (data) => {
    const { data: { id, attributes } } = data;
    store.dispatch(receivingNewChannel(attributes));
    store.dispatch(changeCurrentChannel(id));
  });

  socket.on('removeChannel', (data) => {
    const { data: { id } } = data;
    store.dispatch(receivingRemoveChannel(id));
    store.dispatch(changeCurrentChannel(1));
  });

  socket.on('renameChannel', (data) => {
    const { data: { id, attributes } } = data;
    store.dispatch(receivingRenameChannel({ id, attributes }));
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
