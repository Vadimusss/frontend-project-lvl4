import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ListGroup, Badge } from 'react-bootstrap';
import { actions } from '../slices';
import getModal from '../modals';

const renderModal = ({ modalState, onHide }) => {
  if (modalState.type === null) {
    return null;
  }
  const Component = getModal(modalState.type);
  return <Component
    channel={modalState.channel}
    onHide={onHide}
  />;
};

const Channels = () => {
  const { channels, currentChannelId, modalState } = useSelector((state) => ({
    channels: state.channels.entities,
    currentChannelId: state.channels.currentChannelId,
    modalState: state.modalState,
  }));
  const dispatch = useDispatch();
  const { changeCurrentChannel, showModal, hideModal } = actions;
  const onHide = () => dispatch(hideModal());

  const addBottonRef = useRef();
  useEffect(() => {
    addBottonRef.current.blur();
  });
  const hendleChannelClick = (id) => () => {
    dispatch(changeCurrentChannel(id));
  };
  return (
    <>
      <div className="d-flex px-2 mb-1">
        <span className="align-self-center mr-auto">Channels</span>
        <Button
          variant="outline-dark"
          ref={addBottonRef}
          size="sm"
          onClick={() => dispatch(showModal({ type: 'adding' }))}
          className="mr-1">
          +
          </Button>
      </div>
      <ListGroup>
        {channels.map(({ id, name, removable }) => <ListGroup.Item
          className="d-flex justify-content-left"
          as="button"
          key={id}
          active={id === currentChannelId}
          onClick={hendleChannelClick(id)}>
          <div className="align-self-center mr-auto">{name}</div>
          {removable && <>
            <Badge
              variant="secondary"
              as="div"
              onClick={() => dispatch(showModal({ type: 'renaming', channel: { id, name } }))}
              className="mr-1">
                Rename
            </Badge>
            <Badge
              variant="secondary"
              as="div"
              onClick={() => dispatch(showModal({ type: 'removing', channel: { id, name } }))}>
                -
            </Badge>
          </>}
        </ListGroup.Item>)}
      </ListGroup>
      {renderModal({ modalState, onHide })}
    </>
  );
};

export default Channels;
