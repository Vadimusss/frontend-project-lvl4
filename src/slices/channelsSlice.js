import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    entities: [],
    currentChannelId: null,
  },
  reducers: {
    changeCurrentChannel(state, action) {
      return { entities: state.entities, currentChannelId: action.payload };
    },
    receivingNewChannel(state, action) {
      const channel = action.payload;
      state.entities.push(channel);
    },
    receivingRemoveChannel(state, action) {
      const id = action.payload;
      return {
        entities: state.entities.filter((channel) => channel.id !== id),
        currentChannelId: state.currentChannelId,
      };
    },
    receivingRenameChannel(state, action) {
      const { id, attributes } = action.payload;
      const { name } = attributes;
      const renamedСhannel = state.entities.find((channel) => channel.id === id);
      renamedСhannel.name = name;
    },
  },
});

export default channelsSlice;
