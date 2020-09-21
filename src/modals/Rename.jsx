import React, { useEffect, useRef, forwardRef } from 'react';
import { Formik, Field as FormikField, Form } from 'formik';
import { Modal, FormGroup, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
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

  const validate = (values) => {
    const errors = {};
    if (values.channelNewName === name) {
      errors.channelNewName = 'Name hasn\'t changed!';
    } else if (values.channelNewName === '') {
      errors.channelNewName = 'Required!';
    }

    return errors;
  };

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
          validate={validate}
          onSubmit={async (values) => {
            const { channelNewName } = values;
            try {
              await dispatch(renameChannel({ id, name: channelNewName }));
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
                  name="channelNewName"
                  disabled={isSubmitting}
                />
              {!isValid && <Alert variant='danger'>{errors.channelNewName}</Alert>}
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
