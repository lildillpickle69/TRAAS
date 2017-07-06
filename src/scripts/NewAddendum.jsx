import React, { Component } from 'react';
import { Form, Divider, Input, Grid } from 'semantic-ui-react';
import DateRange from './DateRange';

export default class NewAddendum extends Component {
  render() {
    return (
      <Form>
        <h1><a href="index.html" target="_blank">TRAAS</a></h1>
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
                <Form.Field required control={Input} id="title" label="Report Title" placeholder="Report Title" />
              </Grid.Column>
              <Grid.Column width={4}>
                <Form.Field required control={Input} id="authors" label="Aerospace Authors/PIs" placeholder="Search Authors" />
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Field control={Input} id="jo" label="JO" placeholder="JO" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Group>
        <br />
        <Form.Group>
          <Grid centered celled="internally" verticalAlign="middle" stackable>
            <Grid.Row>
              <Grid.Column width={4}>
                <Form.Field control={Input} id="reportnumber" label="Report Number" placeholder="Report Number" />
              </Grid.Column>
              <Grid.Column width={4}>
                <Form.Field control={Input} id="assets" label="Assets" placeholder="Search assets" />
              </Grid.Column>
              <Grid.Column width={4}>
                <Form.Field control={Input} id="keywords" label="Keywords" placeholder="Search keywords or add your own" />
              </Grid.Column>
              <Grid.Column width={3}>
                <Form.Field control={Input} id="program" label="Program" placeholder="Program" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Group>
        <br />
        <Form.Group width="equal">
          <Grid centered celled="internally" verticalAlign="middle" stackable>
            <Grid.Row>
              <Grid.Column width={12} >
                <Form.Field id="description" label="Description" control="textarea" rows="4" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Form.Group>
        <Form.Group width="equal">
          <Grid centered celled="internally" verticalAlign="middle" stackable>
            <Grid.Row>
              <Grid.Column width={12} >
                <Form.Field
                  id="nonaerospace"
                  label="NON Aerospace MTE: Provide Agency, Property Identification Number, Manufacturer, Model and Calibration Date."
                  control="textarea"
                  rows="4"
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

