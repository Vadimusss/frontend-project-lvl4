import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
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
            channelName: '',
          }}
          onSubmit={async () => {
            try {
              await dispatch(removeChannel({ id }));
              onHide();
            } catch (error) {
              // console.log(error.message);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormGroup>
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
