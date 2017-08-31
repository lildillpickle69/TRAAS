import React, { PureComponent } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Divider } from 'semantic-ui-react';

const style = { textAlign: 'center' };
class OOTCContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.id = (window.location.pathname);
  }
  componentDidMount() {
    axios
    .get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/OOTC?query=${this.id}`)
    .then((response) => console.log(response))
    .catch(err => console.log(err));
  }
  render() {
    return (
      <div>
        <br />
        <h1><Link to="/home/inprogress">TRAAS</Link></h1>
        <Divider horizontal>Out-of-Tolerance Condition #{this.id}</Divider>
        <br />
        <Table celled padded color="purple" >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Reported By</Table.HeaderCell>
              <Table.HeaderCell>Affected Dates</Table.HeaderCell>
              <Table.HeaderCell>Date Reported</Table.HeaderCell>
              <Table.HeaderCell>Asset</Table.HeaderCell>
              <Table.HeaderCell>Manufacturer</Table.HeaderCell>
              <Table.HeaderCell>Model</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Serial</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Cherae Highsmith</Table.Cell>
              <Table.Cell>2016-01-04 to 2016-01-04</Table.Cell>
              <Table.Cell>2017-08-11 09:24:35</Table.Cell>
              <Table.Cell>AAG087</Table.Cell>
              <Table.Cell>AGILENT</Table.Cell>
              <Table.Cell>34401A</Table.Cell>
              <Table.Cell>MULTIMETER</Table.Cell>
              <Table.Cell>SG41007195</Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="8" style={style}><strong>Disposition:</strong>  Repaired and Calibrated</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell colSpan="8" style={style}><strong>Comment:</strong>  Unit received, following repair performed: Replaced K701-K703 (intermittent attenuator relays- most likely cause of amplitude accuracy measurement failure by the customer).</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <br />
        <Divider horizontal>TRAAS Addendums Affected</Divider>
        <Divider horizontal>Emails and Responses</Divider>
        <Table celled padded color="blue" >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>Badge</Table.HeaderCell>
              <Table.HeaderCell collapsing>Username</Table.HeaderCell>
              <Table.HeaderCell collapsing>Email</Table.HeaderCell>
              <Table.HeaderCell>Reason for Sending</Table.HeaderCell>
              <Table.HeaderCell collapsing>PI Disposition</Table.HeaderCell>
              <Table.HeaderCell collapsing>Comment</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        </Table>
        <Divider horizontal>OOTC Attachments</Divider>
      </div>

    );
  }
}

export default connect()(OOTCContainer);
