import React, { useEffect, useRef, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field as FormikField, Form } from 'formik';
import { actions } from '../slices';

// eslint-disable-next-line react/display-name
const Field = forwardRef((props, ref) => (
  <FormikField innerRef={ref} {...props} />
));

const Messages = (props) => {
  const currentChannelMessages = useSelector((state) => state.messages
    .filter(({ channelId }) => channelId === state.channels.currentChannelId));

  const dispatch = useDispatch();
  const { sendMessage } = actions;
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      ref.current.focus();
    }, 100);
  });

  return (
    <>
      <div className="mb-auto overflow-auto">
        {currentChannelMessages.map(({ id, text, name }) => <p key={id}>
          <span className="font-weight-bold">{name}</span>
          {`: ${text}`}
        </p>)}
      </div>
      <Formik
        initialValues={{
          message: '',
          userName: props.userName,
        }}
        onSubmit={ async (values, { setSubmitting, resetForm }) => {
          const { userName } = props;
          const { message } = values;
          try {
            await dispatch(sendMessage({ text: message, name: userName }));
            setSubmitting(false);
            resetForm();
          } catch (error) {
            // console.log(error.message);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field ref={ref} className="form-control" name="message" disabled={isSubmitting} />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Messages;
