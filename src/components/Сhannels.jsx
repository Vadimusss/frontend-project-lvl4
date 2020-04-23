import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ channels, currentChannelId }) => {
  const props = { channels, currentChannelId };
  return props;
};

const Channels = (props) => {
  return (
      <ul>
        <p>{props.channels.map(({ id, name }) => <li key={id}>{name}</li>)}</p>
      </ul>
    )
  };

export default connect(mapStateToProps)(Channels);
