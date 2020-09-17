import messagesSlice, { sendMessage } from './messagesSlice';
import modalStateSlice, { addChannel, renameChannel, removeChannel } from './modalStateSlice';
import channelsSlice from './channelsSlice';

export const actions = {
  ...channelsSlice.actions,
  ...messagesSlice.actions,
  ...modalStateSlice.actions,
  sendMessage,
  addChannel,
  renameChannel,
  removeChannel,
};

export const redusers = {
  channels: channelsSlice.reducer,
  messages: messagesSlice.reducer,
  modalState: modalStateSlice.reducer,
};
