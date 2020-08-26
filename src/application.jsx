import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import Layout from './Layout.jsx';
import UserNameContext from './context';
import './locales';
import {
  messagesSlice,
  currentChannelIdSlice,
  channelsSlice,
  modalStateSlice,
} from './features';

export default (initState, socket, userName) => {
  const store = configureStore({
    reducer: {
      channels: channelsSlice.reducer,
      messages: messagesSlice.reducer,
      currentChannelId: currentChannelIdSlice.reducer,
      modalState: modalStateSlice.reducer,
    },
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: initState,
  });

  const { receivingMessage } = messagesSlice.actions;

  socket.on('newMessage', (data) => {
    const { data: { attributes } } = data;
    store.dispatch(receivingMessage(attributes));
  });

  const {
    receivingNewChannel,
    receivingRemoveChannel,
    receivingRenameChannel,
  } = channelsSlice.actions;

  const { changeCurrentChannel } = currentChannelIdSlice.actions;

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
