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

const Rename = ({ channel: { id, name }, onHide }) => {
  const dispatch = useDispatch();
  const { renameChannel } = actions;
  const ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      ref.current.focus();
    }, 200);
  }, [ref]);

  const validationSchema = Yup.object().shape({
    channelNewName: Yup.string()
      .required('Required')
      .test('Unique', 'Must be unique', (value) => value !== name),
  });

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Rename channel {name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          validateOnBlur={false}
          initialValues={{
            channelNewName: name,
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, resetForm, setErrors }) => {
            const { channelNewName } = values;
            dispatch(renameChannel({ id, name: channelNewName }))
              .then(unwrapResult)
              .then(() => {
                setSubmitting(false);
                resetForm();
                onHide();
              })
              .catch((error) => {
                setErrors({ channelNewName: error.message });
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
                  name="channelNewName"
                  disabled={isSubmitting}
                />
                <ErrorMessage
                  name="channelNewName"
                  render={(msg) => <Alert className={'alert-danger'}>{msg}</Alert>}
                />
              </FormGroup>
              <input type="submit" disabled={isSubmitting} className="btn btn-primary" value="submit" />
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
