import React, { useState } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import cn from 'classnames';
import { sendMessage } from '../actions';
import Notification from './Notification.jsx';

const MessagesForm = (props) => {
  const { sendingState } = useSelector((state) => ({
    sendingState: state.messages.sendingState,
  }), shallowEqual);
  const isPending = sendingState === 'pending';
  const [notification, setNotification] = useState(null);
  const [inputIsInvalid, setInputInvalidityState] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      message: '',
      userName: props.userName,
    },
    onSubmit: async (values, { resetForm }) => {
      const { userName } = props;
      const { message } = values;
      dispatch(sendMessage({ text: message, name: userName }))
        .then(unwrapResult)
        .then(() => {
          setNotification(<Notification
            type={'success'}
            message={`${t('sendMessageFulfilled')}`}
            liveTime={2000}
            hide={() => { setNotification(null); }}/>);
          resetForm();
          setInputInvalidityState(false);
        })
        .catch((error) => {
          setNotification(<Notification
            type={'warning'}
            message={`${t('sendMessageRejected')} ${error.message}`}
            liveTime={5000}
            hide={() => { setNotification(null); }}/>);
          setInputInvalidityState(true);
        });
    },
  });

  const inputClass = cn({
    'form-control': true,
    'is-invalid': inputIsInvalid,
  });

  return (
    <div>
      {notification}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <input
            type="message"
            disabled={isPending}
            name="message"
            onChange={formik.handleChange}
            value={formik.values.message}
            className={inputClass}
          />
        </div>
      </form>
    </div>
  );
};

export default MessagesForm;
