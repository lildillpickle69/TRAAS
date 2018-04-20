// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Divider, Grid, Message, Loader, Dimmer, Segment } from 'semantic-ui-react';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import { DateRangeInput } from '@blueprintjs/datetime';
import { Field, Fields, reduxForm, formValueSelector } from 'redux-form';
import DateRangePickerWrapper from './DateRange';
import DropdownContainer from './DropdownContainer';
import ModalContainer from './ModalContainer';
import { loadData } from '../actions';
import { Dates } from '../components';

const required = value => (value ? undefined : true);

const renderCheckbox = ({ input, label, meta: { touched, error }, ...custom }) =>
(
  <Form.Checkbox defaultChecked={!!input.value} value={1} {...input} {...custom} label={label} onChange={(e, data) => input.onChange(data.checked)} />
);
        {/*<Message
          error
          header="Field Required"
          content="Please fill out this field."
        />*/}
const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
  return (
    <div>
      <Form.Input error={error && touched} placeholder={label} label={label} {...input} {...custom} />
      <Message error visible={touched && error} header="Field Required" content="Please fill out this field." />
    </div>
  );
};
const renderTextArea = ({ input, required, label, meta: { touched, error }, ...custom }) => (
  <Form.TextArea rows={4} label={label} {...input} {...custom} error={touched && error} />
);

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.id = (this.props.url).substring(11);
    this.state = {
      exists: null,
      permission: this.id.length === 19,
    };
  }
  componentDidMount() {
    axios.get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/data.pl?query=${this.id}`)
      .then((response) => {
        this.setState({
          exists: response.data.results[0].exists === 'true',
          permission: response.data.results[0].permission === 'true',
        }, () => this.forceUpdate());
      })
      .catch((err) => { console.log(err); });
  }

  render() {
    const { onSubmit, number, ID, isfinalized, initialValues, handleSubmit } = this.props;
    if (this.state.exists === null || this.state.exists === false || (this.state.exists && this.state.permission)) {
      return (
        <Segment>
          <Dimmer active={this.state.exists === null}>
            <Loader />
          </Dimmer>
          <h1><Link to="/home/inprogress">TRAAS</Link></h1>
          <Form onSubmit={handleSubmit} >
            <Divider horizontal>Addendum {number}</Divider>
            <br /> 
            <Form.Group width="equal">
              <Grid celled="internally" verticalAlign="middle" stackable centered>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Fields
                      id="Select or type the dates."
                      label="Select or type the dates."
                      validate={required}
                      names={['interval_start', 'interval_end']}
                      component={Dates}
                      format={(value) => (value === '' ? null : value)}
                    />
                  </Grid.Column>
                  <Grid.Column width={5}>
                    <Field validate={required} name="report_name" type="text" component={renderTextField} label="Report Title" id="title" required />
                  </Grid.Column>
                  <Grid.Column width={3}>
                  <Field validate={required} component={DropdownContainer} query="authors" name="PI" label="First Aerospace Author / PI" id="pi" required />
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Field label="JO" name="JO" type="text" component={renderTextField} id="JO" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form.Group>
            <br />
            <Form.Group width="equal">
              <Grid centered celled="internally" verticalAlign="middle" stackable>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Field type="text" component={renderTextField} id="report_number" label="Report Number" name="report_number" />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Field component={DropdownContainer} label="Keywords" id="keywords" name="Keywords" query="keywords" multi creatable />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Field type="text" component={renderTextField} id="program" label="Program" name="Program" />
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Field component={DropdownContainer} query="authors" label="Additional Authors" name="OtherAuthors" multi />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form.Group>
            <br />
            <Form.Group width="equal">
              <Grid centered celled="internally" verticalAlign="middle" stackable>
                <Grid.Row>
                  <Grid.Column width={10} >
                    <Field id="description" label="Description" name="Comment" component={renderTextArea} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form.Group>
            <Form.Group width="equal">
              <Grid centered celled="internally" verticalAlign="middle" stackable>
                <Grid.Row>
                  <Grid.Column width={10} >
                    <Field
                      id="nonaerospace"
                      label="NON Aerospace MTE: Provide Agency, Property Identification Number, Manufacturer, Model and Calibration Date."
                      name="TRAAS_non_MTE"
                      component={renderTextArea}
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Form.Group>
            <Grid centered stackable>
              <Grid.Column width={6} >
                <Field validate={required} component={DropdownContainer} label="Assets" id="assetfield" name="Assets" multi query="assets" required/>
              </Grid.Column>
            </Grid>
            <br />
            <Grid centered columns={2}>
              <Grid.Row>
                <Grid.Column textAlign="center">
                  <Field
                    component={renderCheckbox}
                    label="Do you want to finalize this addendum?"
                    name="Complete"
                    id="finalized"
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <ModalContainer isfinalized={isfinalized} handleSubmit={handleSubmit} />
          </Form>
        </Segment>
      );
    }
    return (
      <h1>You do not have permission to edit this addendum</h1>
    );
  }
}

const reduxFormDecorator = reduxForm({
  form: 'addendumform',
  enableReinitialize: true,
  //validate,
});
const selector = formValueSelector('addendumform');
const reduxConnector = connect(
  (state) => {
    const isfinalized = selector(state, 'Complete');
    return {
      isfinalized,
      initialValues: state.database.data,
    };
  },
  dispatch => ({
    load: (dispatch(loadData(window.location.hash.substring(12)))),
  }));

export default reduxConnector(reduxFormDecorator(FormContainer));
