/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { sendMessage } from '../actions';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    entities: [],
    sendingState: 'idle',
  },
  reducers: {
    receivingMessage(state, action) {
      const message = action.payload;
      state.entities.push(message);
    },
  },
  extraReducers: {
    [sendMessage.pending]: (state, action) => {
      if (state.sendingState === 'idle') {
        state.sendingState = 'pending';
      }
    },
    [sendMessage.fulfilled]: (state, action) => {
      if (state.sendingState === 'pending') {
        state.sendingState = 'idle';
      }
    },
    [sendMessage.rejected]: (state, action) => {
      if (state.sendingState === 'pending') {
        state.sendingState = 'idle';
        state.sendingStatusMessage = action.error.message;
      }
    },
  },
});

export default messagesSlice;
