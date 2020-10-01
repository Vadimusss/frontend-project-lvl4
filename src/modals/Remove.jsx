import React from 'react';
import { Modal, FormGroup, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Formik, Form, ErrorMessage } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import { actions } from '../slices';

const Remove = ({ channel: { id, name }, onHide }) => {
  const dispatch = useDispatch();
  const { removeChannel } = actions;

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Remove channel {name}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            removing: '',
          }}
          onSubmit={async (value, { setSubmitting, setErrors }) => {
            dispatch(removeChannel({ id }))
              .then(unwrapResult)
              .then(() => {
                setSubmitting(false);
                onHide();
              })
              .catch((error) => {
                setErrors({ removing: error.message });
              });
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormGroup>
                <ErrorMessage
                  name="removing"
                  render={(msg) => <Alert className={'alert-danger'}>{msg}</Alert>}
                />
              </FormGroup>
              <input type="submit" disabled={isSubmitting} className="btn btn-danger" value="remove" />
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
