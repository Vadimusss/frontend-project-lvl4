import axios from 'axios';
import { createAction } from '@reduxjs/toolkit';
import routes from '../routes';

export const receivingMessage = createAction('MESSAGE_RECEIVING_SUCCESS');

export const sendMessage = ({ text, name, currentChannelId }) => async (dispath) => {
  await axios.post(routes.channelMessagesPath(currentChannelId), {
    data: {
      attributes: {
        text: text,
        name: name,
      },
    }
  });
};
