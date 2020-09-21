import React, { useEffect, useRef, forwardRef } from 'react';
import { Formik, Field as FormikField, Form } from 'formik';
import { Modal, FormGroup, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { actions } from '../slices';

// eslint-disable-next-line react/display-name
const Field = forwardRef((props, ref) => (
  <FormikField innerRef={ref} {...props} />
));

const Add = ({ onHide }) => {
  const dispatch = useDispatch();
  const { addChannel } = actions;
  const ref = useRef();

  useEffect(() => {
    console.log(ref);
    setTimeout(() => {
      ref.current.focus();
    }, 200);
  }, [ref]);

  const validate = (values) => {
    const errors = {};
    if (values.channelName === '') {
      errors.channelName = 'Required';
    }
    return errors;
  };

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
          validate={validate}
          onSubmit={async (values) => {
            const { channelName } = values;
            try {
              await dispatch(addChannel({ name: channelName }));
              onHide();
            } catch (error) {
              // console.log(error.message);
            }
          }}
        >
          {({
            isSubmitting,
            errors,
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
                {!isValid && <Alert variant='danger'>{errors.channelName}</Alert>}
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
