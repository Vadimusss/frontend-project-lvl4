import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Channels, Messages } from '.';
import UserNameContext from '../context';

const Layout = () => (
  <Container className="h-100">
    <Row className="h-100">
      <Col xs={3} >
        <Channels />
      </Col>
      <Col className="d-flex flex-column h-100">
        <UserNameContext.Consumer>
          {(userName) => <Messages userName={userName} />}
        </UserNameContext.Consumer>
      </Col>
    </Row>
  </Container>
);

export default Layout;
