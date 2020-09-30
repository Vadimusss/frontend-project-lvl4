// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import gon from 'gon';
import io from 'socket.io-client';
import setNameIfEmpty from './utils';
import application from './application.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

const { channels, messages, currentChannelId } = gon;
const initState = {
  channels: {
    entities: channels,
    currentChannelId,
  },
  messages,
};

application(initState, socket, setNameIfEmpty());
