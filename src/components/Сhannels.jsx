import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({ channels, currentChannalId }) => {
  const props = { channels, currentChannalId };
  return props;
};

class Channels extends React.Component {
  render() {
    const { channels } = this.props;
    return (
      <p>{channels[0].name}</p>
    )
  };
};

export default connect(mapStateToProps)(Channels);
