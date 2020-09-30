import React, { useEffect, useRef, forwardRef } from 'react';
import {
  Formik,
  ErrorMessage,
  Field as FormikField,
  Form,
} from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { Modal, FormGroup, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { actions } from '../slices';

// eslint-disable-next-line react/display-name
const Field = forwardRef((props, ref) => (
  <FormikField innerRef={ref} {...props} />
));

const validationSchema = Yup.object().shape({
  channelName: Yup.string()
    .required('Required'),
});

const Add = ({ onHide }) => {
  const dispatch = useDispatch();
  const { addChannel } = actions;
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      ref.current.focus();
    }, 200);
  }, [ref]);

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validateOnBlur={false}
          initialValues={{
            channelName: '',
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
            const { channelName } = values;
            dispatch(addChannel({ name: channelName }))
              .then(unwrapResult)
              .then(() => {
                setSubmitting(false);
                resetForm();
                onHide();
              })
              .catch((error) => {
                setErrors({ channelName: error.message });
              });
          }}
        >
          {({
            isSubmitting,
            isValid,
          }) => (
            <Form>
              <FormGroup>
                <Field
                  ref={ref}
                  className={`form-control${isValid ? '' : ' is-invalid'}`}
                  name="channelName"
                  disabled={isSubmitting}
                />
                <ErrorMessage
                  name="channelName"
                  render={(msg) => <Alert className={'alert-danger'}>{msg}</Alert>}
                />
              </FormGroup>
              <input
                type="submit"
                disabled={isSubmitting || !isValid}
                className="btn btn-primary"
                value="submit"
              />
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
