import React, { useState } from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { unwrapResult } from '@reduxjs/toolkit';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { removeChannel } from '../actions';
import Notification from '../components/Notification.jsx';

const Remove = ({ channel: { id, name }, onHide }) => {
  const { channelProcessingState } = useSelector((state) => ({
    channelProcessingState: state.modalState.channelProcessingState,
  }), shallowEqual);
  const isPending = channelProcessingState === 'pending';
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(null);
  const { t } = useTranslation();

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(removeChannel({ id }))
      .then(unwrapResult)
      .then(() => {
        onHide();
      })
      .catch((error) => {
        setNotification(<Notification
          type={'warning'}
          message={`${t('removeChannelRejected')} ${error.message}`}
          liveTime={5000}
          hide={() => { setNotification(null); }}/>);
      });
  };

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Remove channel {name}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {notification}
        <form onSubmit={onSubmit}>
          <FormGroup>
          </FormGroup>
          <input type="submit" disabled={isPending} className="btn btn-danger" value="remove" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
