/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { addChannel, renameChannel, removeChannel } from '../actions';

const modalStateSlice = createSlice({
  name: 'modalState',
  initialState: {
    type: null,
    channel: { id: null, name: null },
    channelProcessingState: 'idle',
  },
  reducers: {
    showModal(state, action) {
      const { type, channel = { id: null, name: null } } = action.payload;
      state.type = type;
      state.channel = channel;
    },
    hideModal(state, action) {
      state.type = null;
      state.channel = { id: null, name: null };
    },
  },
  extraReducers: {
    [addChannel.pending]: (state, action) => {
      if (state.channelProcessingState === 'idle') {
        state.channelProcessingState = 'pending';
      }
    },
    [addChannel.fulfilled]: (state, action) => {
      if (state.channelProcessingState === 'pending') {
        state.channelProcessingState = 'idle';
      }
    },
    [addChannel.rejected]: (state, action) => {
      if (state.channelProcessingState === 'pending') {
        state.channelProcessingState = 'idle';
      }
    },
    [renameChannel.pending]: (state, action) => {
      if (state.channelProcessingState === 'idle') {
        state.channelProcessingState = 'pending';
      }
    },
    [renameChannel.fulfilled]: (state, action) => {
      if (state.channelProcessingState === 'pending') {
        state.channelProcessingState = 'idle';
      }
    },
    [renameChannel.rejected]: (state, action) => {
      if (state.channelProcessingState === 'pending') {
        state.channelProcessingState = 'idle';
      }
    },
    [removeChannel.pending]: (state, action) => {
      if (state.channelProcessingState === 'idle') {
        state.channelProcessingState = 'pending';
      }
    },
    [removeChannel.fulfilled]: (state, action) => {
      if (state.channelProcessingState === 'pending') {
        state.channelProcessingState = 'idle';
      }
    },
    [removeChannel.rejected]: (state, action) => {
      if (state.channelProcessingState === 'pending') {
        state.channelProcessingState = 'idle';
      }
    },
  },
});

export default modalStateSlice;
