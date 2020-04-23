import React from 'react';
import Channels from './Сhannels';
import Messages from './Messages';
import MessagesForm from './MessagesForm';
import UserNameContext from '../context';

const Layout = () => (
  <div className="container">
    <div className="row">
      <div className="col-4">
        <Channels />
      </div>
      <div className="col-8">
        <div className="row">
          <div className="col-sm">
            <Messages />
          </div>
          <div className="w-100"></div>
          <div className="col-sm">
            <UserNameContext.Consumer>
              {userName => <MessagesForm userName={userName}/>}
            </UserNameContext.Consumer>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Layout;