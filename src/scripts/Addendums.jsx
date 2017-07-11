import React, { Component } from 'react';
import { Form, Divider, Grid, Dropdown } from 'semantic-ui-react';
import DateRange from './DateRange';
import AuthorsDropdown from './AuthorsDropdown'; 

export default class Addendums extends Component {
  render() {
    const stateoptions = [{ key: 'AL', value: 'AL', text: 'Alabama' }];
    return (
      <Form>
        <AuthorsDropdown /> 
        <Divider horizontal>Addendum #SOMETHING</Divider>
        <br />
        <Form.Group width="equal">
          <Grid celled="internally" verticalAlign="middle" stackable centered>
            <Grid.Row>
              <Grid.Column width={4}>
                <Form.Field
                  id="dates"
                  label="Select or type the dates in the format MM/DD/YYYY."
                  control={DateRange}
                />
              </Grid.Column>
              <Grid.Column width={4}>
                <Form.Input required id="title" label="Report Title" placeholder="Report Title" />
              </Grid.Column>
              <Grid.Column width={4}>
                <Form.Field
                  control={AuthorsDropdown}
                  required
                  id="authors"
                  label="Aerospace Authors/PIs"
                  placeholder="Search Authors"
                />
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Input id="jo" label="JO" placeholder="JO" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Group>
        <br />
        <Form.Group>
          <Grid centered celled="internally" verticalAlign="middle" stackable>
            <Grid.Row>
              <Grid.Column width={4}>
                <Form.Input id="reportnumber" label="Report Number" placeholder="Report Number" />
              </Grid.Column>
              <Grid.Column width={4}>
                <Form.Dropdown fluid search selection multiple options={stateoptions} id="assets" label="Assets" placeholder="Search assets" />
              </Grid.Column>
              <Grid.Column width={4}>
                {/*<Form.Field control={D} label="Keywords" />*/}
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Input id="program" label="Program" placeholder="Program" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Group>
        <br />
        <Form.Group width="equal">
          <Grid centered celled="internally" verticalAlign="middle" stackable>
            <Grid.Row>
              <Grid.Column width={12} >
                <Form.TextArea id="description" label="Description" rows={4} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Group>
        <Form.Group width="equal">
          <Grid centered celled="internally" verticalAlign="middle" stackable>
            <Grid.Row>
              <Grid.Column width={12} >
                <Form.TextArea
                  id="nonaerospace"
                  label="NON Aerospace MTE: Provide Agency, Property Identification Number, Manufacturer, Model and Calibration Date."
                  rows={4}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Group>
        <Form.Field label="An HTML <button>" control="button">
      HTML Button
        </Form.Field>
      </Form>
    );
  }
}

