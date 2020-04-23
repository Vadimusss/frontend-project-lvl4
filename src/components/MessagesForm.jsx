import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions';
import { useFormik } from 'formik';
import cn from 'classnames';

const mapStateToProps = ({ currentChannelId }) => {
  const props = { currentChannelId: currentChannelId };
  return props;
};

const mapDispatchToProps = {
  sendMessage: sendMessage,
};

const MessagesForm = (props) => {
  const formik = useFormik({
    initialValues: {
      message: '',
      userName: props.userName,
    },
    onSubmit: async (values, { resetForm, setStatus }) => {
      const { sendMessage, currentChannelId, userName } = props;
      const { message } = values;
      try {
        await sendMessage({
          text: message,
          name: userName,
          currentChannelId: currentChannelId,
        });
        resetForm();
      } catch (error) {
        setStatus(error.message);
      }
    },
  });

  const inputClass = cn({
    'form-control': true,
    'is-invalid': formik.status,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <input type="message" name="message" onChange={formik.handleChange} value={formik.values.message} className={inputClass} />
        <div className="d-block invalid-feedback ">{formik.status}</div>
      </div>
    </form>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesForm);