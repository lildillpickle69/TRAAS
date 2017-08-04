import React from 'react';
import { connect } from 'react-redux';
import { Form, Divider, Grid, Message, Loader, Dimmer, Segment } from 'semantic-ui-react';
import moment from 'moment';
import { Field, Fields, reduxForm, formValueSelector } from 'redux-form';
import DateRangePickerWrapper from './DateRange';
import DropdownContainer from './DropdownContainer';
import ModalContainer from './ModalContainer';
import { loadData } from '../actions';

const required = value => (value ? undefined : true); 

const renderDates = fields => (
  <Form.Field
    {...fields}
    control={DateRangePickerWrapper}
    startDateFieldName="interval_start"
    endDateFieldName="interval_end"
  />
);
const formatDates = (value, name) => (
  moment(value)
);
const normalizeDates = (name, value) => (
  value.format()
);
const renderCheckbox = ({input, label, meta: { touched, error },...custom }) => {
  return (
    <Form.Checkbox defaultChecked={!!input.value} value={1} {...input} {...custom} label={label} onChange={(e, data) => input.onChange(data.checked)} />
  );
};
        {/*<Message
          error
          header="Field Required"
          content="Please fill out this field."
        />*/}
const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
  return (
    <div>
      <Form.Input error={error} placeholder={label} label={label} {...input} {...custom} />
      <Message error visible={error} header="Field Required" content="Please fill out this field." />
    </div>
  );
};
const renderTextArea = ({ input, required, label, meta: { touched, error }, ...custom }) => (
  <Form.TextArea rows={4} label={label} {...input} {...custom} error={touched && error} />
);
const FormContainer = (props) => {
  const { handleSubmit, generateDraft, exists, permission, number, ID, isfinalized } = props;
  const center = { position: 'relative', left: '40%' };
  if (exists == null || false || (exists && permission)) {
    return (
      <Segment>
        <Dimmer active={exists === null}>
          <Loader />
        </Dimmer>
        <Form onSubmit={handleSubmit} >
          <Divider horizontal>Addendum {number}</Divider>
          <br />
          <Form.Group width="equal">
            <Grid celled="internally" verticalAlign="middle" stackable centered>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Fields
                    names={['interval_start', 'interval_end']}
                    component={renderDates}
                    normalize={normalizeDates}
                    format={formatDates}
                    label="Select or type the dates in the format MM/DD/YYYY."
                  />
                </Grid.Column>
                <Grid.Column width={2}>
                  <Field validate={required} name="report_name" type="text" component={renderTextField} label="Report Title" id="title" />
                </Grid.Column>
                <Grid.Column width={3}>
                  <Field validate={required} component={DropdownContainer} query="authors" name="PI" label="PI Name" id="pi" />
                </Grid.Column>
                <Grid.Column width={3}>
                  <Field component={DropdownContainer} query="authors" label="Additional Authors" name="OtherAuthors" multi />
                </Grid.Column>
                <Grid.Column width={2}>
                  <Field label="JO" name="JO" type="text" component={renderTextField} id="JO" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form.Group>
          <br />
          <Form.Group>
            <Grid centered celled="internally" verticalAlign="middle" stackable>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Field type="text" component={renderTextField} id="report_number" label="Report Number" name="report_number" />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field validate={required} component={DropdownContainer} label="Assets" id="assets" name="Assets" multi query="assets" />
                </Grid.Column>
                <Grid.Column width={4}>
                  <Field component={DropdownContainer} label="Keywords" id="keywords" name="Keywords" query="keywords" multi creatable />
                </Grid.Column>
                <Grid.Column width={3}>
                  <Field type="text" component={renderTextField} id="program" label="Program" name="Program" />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form.Group>
          <br />
          <Form.Group width="equal">
            <Grid centered celled="internally" verticalAlign="middle" stackable>
              <Grid.Row>
                <Grid.Column width={12} >
                  <Field id="description" label="Description" name="Comment" component={renderTextArea} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form.Group>
          <Form.Group width="equal">
            <Grid centered celled="internally" verticalAlign="middle" stackable>
              <Grid.Row>
                <Grid.Column width={12} >
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
          <Field
            style={center}
            component={renderCheckbox}
            label="Do you want to finalize this addendum?"
            name="Complete"
            id="finalized"
          />
          <ModalContainer center={center} isfinalized={isfinalized} handleSubmit={handleSubmit} />
        </Form>
      </Segment>
    );
  }
  return (
    <h1>You do not have permission to edit this addendum</h1>
  );
};

const reduxFormDecorator = reduxForm({
  form: 'addendumform',
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
