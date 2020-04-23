// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import '../assets/application.scss';

import faker from 'faker';
// @ts-ignore
import gon from 'gon';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
import application from './application.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const getName = () => {
  const name = Cookies.get('name');
  if (name) {
    return name;
  }
  // @ts-ignore
  Cookies.set('name', faker.name.firstName());
  return Cookies.get('name');
}

const socket = io();

application(gon, socket, getName());

console.log('it works!');
console.log('gon', gon);