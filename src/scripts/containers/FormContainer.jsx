import React, { PureComponent } from 'react';
import { Form, Divider, Grid } from 'semantic-ui-react';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import DateRange from './DateRange';
// import AuthorsDropdown from './AuthorsDropdown';
// import AssetsDropdown from './AssetsDropdown';
// import KeywordsDropdown from './KeywordsDropdown';
// import PiDropdown from './PiDropdown';


/* 
Load data -> if data is blank, just generate empty form.
If data is not blank, check if user is authorized. 
If not authorized, put a user is not authorized message.
Otherwise, load data normally;

*/
// const validate = (values) => {
//   const errors = {}
//   if (!values.username) {
//     errors.username = 'Required'
//   } else if (values.username.length > 15) {
//     errors.username = 'Must be 15 characters or less'
//   }
//   if (!values.email) {
//     errors.email = 'Required'
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address'
//   }
//   if (!values.age) {
//     errors.age = 'Required'
//   } else if (isNaN(Number(values.age))) {
//     errors.age = 'Must be a number'
//   } else if (Number(values.age) < 18) {
//     errors.age = 'Sorry, you must be at least 18 years old'
//   }
//   return errors
// }

const FormContainer = (props) => {
  const { handleSubmit, save, generateDraft, submitting, exists, number} = props;
  return (
    <Form onSubmit={handleSubmit}>
      <Divider horizontal>Addendum {number}</Divider>
      <br />
      <Form.Group width="equal">
        <Grid celled="internally" verticalAlign="middle" stackable centered>
          <Grid.Row>
            <Grid.Column width={4}>
              <Field name="dates" component={DateRange} id="dates" label="Select or type the dates in the format YYYY/MM/DD."/>
            </Grid.Column>
            {/*<Grid.Column width={2}>
              <Form.Input required id="title" label="Report Title" placeholder="Report Title" name="title" onChange={this.handleChange} />
            </Grid.Column>
            <Grid.Column width={3}>
              <Form.Field required id="pi" label="PI name" control={PiDropdown} getpi={this.handleElementChange} name="pi" />
            </Grid.Column>
            <Grid.Column width={3}>
              <Form.Field id="authors" label="Additional Authors" control={AuthorsDropdown} getauthors={this.handleElementChange} name="authors" />
            </Grid.Column>
            <Grid.Column width={2}>
              <Form.Input id="jo" label="JO" placeholder="JO" name="jo" onChange={this.handleChange} />
            </Grid.Column>*/}
          </Grid.Row>
        </Grid>
      </Form.Group>
      <br />

    </Form>
  );
};

export default reduxForm({
  form: 'addendumform',
  //validate,
})(FormContainer);
