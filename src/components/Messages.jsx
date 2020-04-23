import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ messages, currentChannelId }) => {
  const props = { messages: messages.filter(({ channelId }) => channelId === currentChannelId) };
  return props;
};

const Messages = (props) => {
  return (
    <>
      {props.messages.map(({ id, text, name }) => <p key={id}>
        <span className="font-weight-bold">{name}</span>
        {`: ${text}`}
      </p>)}
    </>
  )
}

export default connect(mapStateToProps)(Messages);