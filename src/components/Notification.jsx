import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const Notification = (props) => {
  const {
    liveTime,
    type,
    message,
    hide,
  } = props;

  useEffect(() => {
    setTimeout(hide, liveTime);
  });

  return <Alert variant={type}>{message}</Alert>;
};

export default Notification;
