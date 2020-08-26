import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const sendMessage = createAsyncThunk(
  'messages/sendMessageStatus',
  async ({ text, name }, { getState }) => {
    const { currentChannelId } = getState();
    const response = await axios.post(routes.channelMessagesPath(currentChannelId), {
      data: {
        attributes: {
          text,
          name,
        },
      },
    });

    return response;
  },
);

export const addChannel = createAsyncThunk(
  'modalState/channelAddingStatus',
  async ({ name }) => {
    const response = await axios.post(routes.channelsPath(), {
      data: {
        attributes: {
          name,
        },
      },
    });

    return response;
  },
);

export const renameChannel = createAsyncThunk(
  'modalState/channelRenamingStatus',
  async ({ id, name }) => {
    const response = await axios.patch(routes.channelPath(id), {
      data: {
        attributes: {
          name,
        },
      },
    });

    return response;
  },
);

export const removeChannel = createAsyncThunk(
  'modalState/channelRemoveingStatus',
  async ({ id }) => {
    const response = await axios.delete(routes.channelPath(id));

    return response;
  },
);
