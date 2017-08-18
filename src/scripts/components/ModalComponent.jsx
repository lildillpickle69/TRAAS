// @flow

import React, { PureComponent } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

class ModalComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
    this.handleUnmount = this.handleUnmount.bind(this);
  }
  handleUnmount() {
    this.setState({
      redirect: true,
    });
  }
  render() {
    const { center, modalvisible, isfinalized, handleSubmit, onClick } = this.props;
    return (
      <div>
        {this.state.redirect ? <Redirect to="/home/inprogress" /> : null}
        <Modal open={modalvisible} onUnmount={isfinalized ? this.handleUnmount : null} >
          <Modal.Header content={isfinalized ? 'Addendum Successfully Submited!' : 'Addendum Successfully Saved!'} />
          <Modal.Actions>
            <Button icon="check" content="All Done" onClick={onClick} />
          </Modal.Actions>
        </Modal>
        <Form.Group inline style={center}>
          <Form.Field>
            <Button type="submit" onClick={handleSubmit} content={isfinalized ? 'Submit' : 'Save'} primary />
          </Form.Field>
        </Form.Group>
      </div>
    );
  }
}

export default ModalComponent;
