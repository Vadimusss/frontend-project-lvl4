/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const addChannel = createAsyncThunk(
  'modalState/channelAddingStatus',
  async ({ name }) => {
    await axios.post(routes.channelsPath(), {
      data: {
        attributes: {
          name,
        },
      },
    });
  },
);

export const renameChannel = createAsyncThunk(
  'modalState/channelRenamingStatus',
  async ({ id, name }) => {
    await axios.patch(routes.channelPath(id), {
      data: {
        attributes: {
          name,
        },
      },
    });
  },
);

export const removeChannel = createAsyncThunk(
  'modalState/channelRemoveingStatus',
  async ({ id }) => {
    await axios.delete(routes.channelPath(id));
  },
);

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
});

export default modalStateSlice;
