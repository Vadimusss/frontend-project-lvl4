/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';
import channelsSlice from './channelsSlice';

export const sendMessage = createAsyncThunk(
  'messages/sendMessageStatus',
  async ({ text, name }, { getState }) => {
    const { currentChannelId } = getState().channels;
    await axios.post(routes.channelMessagesPath(currentChannelId), {
      data: {
        attributes: {
          text,
          name,
        },
      },
    });
  },
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    receivingMessage(state, action) {
      const message = action.payload;
      state.push(message);
    },
  },
  extraReducers: {
    [channelsSlice.actions.receivingRemoveChannel]: (state, action) => {
      const id = action.payload;
      return state.filter((message) => message.channelId !== id);
    },
  },
});

export default messagesSlice;
