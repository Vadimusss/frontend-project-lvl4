import { createReducer } from '@reduxjs/toolkit';
import * as actions from '../actions';

export const channelsReduser = createReducer([], {});

export const messagesReduser = createReducer([], {
  [actions.receivingMessage]: (state, action) => {
    const message = action.payload;
    state.push(message);
  },
});
