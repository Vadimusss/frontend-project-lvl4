import React from 'react';
import { useSelector } from 'react-redux';

const Messages = () => {
  const currentChannemessages = useSelector((state) => state.messages.entities
    .filter(({ channelId }) => channelId === state.currentChannelId));

  return (<div className="mb-auto overflow-auto">
    {currentChannemessages.map(({ id, text, name }) => <p key={id}>
      <span className="font-weight-bold">{name}</span>
      {`: ${text}`}
    </p>)}
  </div>);
};

export default Messages;
