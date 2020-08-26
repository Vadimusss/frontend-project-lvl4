import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';
import { unwrapResult } from '@reduxjs/toolkit';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import Notification from '../components/Notification.jsx';
import { addChannel } from '../actions';

const Add = ({ onHide }) => {
  const { channelProcessingState } = useSelector((state) => ({
    channelProcessingState: state.modalState.channelProcessingState,
  }), shallowEqual);
  const isPending = channelProcessingState === 'pending';
  const dispatch = useDispatch();
  const [notification, setNotification] = useState(null);
  const [inputIsInvalid, setInputInvalidityState] = useState(false);
  const { t } = useTranslation();
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, [null]);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: async (values) => {
      const { body } = values;
      dispatch(addChannel({ name: body }))
        .then(unwrapResult)
        .then(() => {
          onHide();
        })
        .catch((error) => {
          setNotification(<Notification
            type={'warning'}
            message={`${t('addChannelRejected')} ${error.message}`}
            liveTime={5000}
            hide={() => { setNotification(null); }}/>);
          setInputInvalidityState(true);
        });
    },
  });

  const inputClass = cn({
    'is-invalid': inputIsInvalid,
  });

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {notification}
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={ref}
              disabled={isPending}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.body}
              name="body"
              className={inputClass}
            />
          </FormGroup>
          <input type="submit" disabled={isPending} className="btn btn-primary" value="submit" />
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
