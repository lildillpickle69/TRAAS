// @flow

import React, { PureComponent } from 'react';
import { Modal, Button, Form, Grid } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Component to render submit confirmation for addendums

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
    const { modalvisible, isfinalized, handleSubmit, onClick } = this.props;
    return (
      <div>
        {this.state.redirect ? <Redirect to="/home/inprogress" /> : null}
        <Modal open={modalvisible} onUnmount={isfinalized ? this.handleUnmount : null} >
          <Modal.Header content={isfinalized ? 'Addendum Successfully Submited!' : 'Addendum Successfully Saved!'} />
          <Modal.Actions>
            <Button icon="check" content="All Done" onClick={onClick} />
          </Modal.Actions>
        </Modal>
        <Grid centered columns={2}>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Form.Field>
                <Button type="submit" onClick={handleSubmit} content={isfinalized ? 'Submit' : 'Save'} primary />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
ModalComponent.defaultProps = {
  isfinalized: false
};

ModalComponent.propTypes = {
  modalvisible: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  isfinalized: PropTypes.bool
};
export default ModalComponent;
