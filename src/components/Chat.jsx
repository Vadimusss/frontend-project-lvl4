import React from 'react';
import Channels from './Сhannels';

export default class Chat extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <Channels />
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col-sm">чат</div>
              <div className="w-100"></div>
              <div className="col-sm">форма</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};