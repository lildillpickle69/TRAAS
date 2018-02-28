import React, { PureComponent } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Divider, Segment, Loader, Dimmer, Button, Message } from 'semantic-ui-react';

const style = { textAlign: 'center' };
const style1 = { left: '45%', textAlign: 'center' };
const style2 = { left: '43%', textAlign: 'center' };
class OOTCReports extends PureComponent {
  constructor(props) {
    super(props);
    this.id = (this.props.location.pathname).substring(6);
    this.state = {
      ReportedBy: '',
      startdate: null,
      enddate: null,
      Asset: '',
      Manufacturer: '',
      Model: '',
      Description: '',
      Serial: '',
      Disposition: '',
      Comment: '',
      Date: null,
      emaildata: [],
      loading: true,
      attachments: [],
      parameters: [],
      reports: [],
    };
  }
  componentDidMount() {
    axios
    .get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/OOTC.pl?query=${this.id}&limit=100`)
    .then((response) => {
      const data = response.data.results[0];
      const date = new Date(data.startdate);
      let startdate = `${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getUTCFullYear()}`;
      console.log(startdate);
      if (startdate === '1/1/1') {
        startdate = 'No previous calibration history available.';
      }
      const edate = new Date(data.enddate);
      const enddate = `${edate.getUTCMonth() + 1}/${edate.getUTCDate()}/${edate.getUTCFullYear()}`;
      this.setState({
        ReportedBy: data.ReportedBy,
        Comment: data.Comment,
        startdate,
        enddate,
        Asset: data.Asset,
        Date: data.Date,
        Description: data.Description,
        Manufacturer: data.Manufacturer,
        Serial: data.Serial,
        Model: data.Model,
        Disposition: data.Disposition,
        emaildata: response.data.emails,
        loading: false,
        attachments: response.data.attachments,
        parameters: response.data.parameters,
        reports: response.data.reports,
      });
    })
    .catch(err => console.log(err));
  }
  render() {
    const emailstate = (this.state.emaildata);
    const emails = emailstate.map((emailInfo) => {
      const { badge, email, username, comment, reason, disposition } = emailInfo;
      return (
        <Table.Row key={reason}>
          <Table.Cell key={badge}>{badge}</Table.Cell>
          <Table.Cell key={username}>{username}</Table.Cell>
          <Table.Cell key={email}>{email}</Table.Cell>
          <Table.Cell key={reason}>{reason}</Table.Cell>
          <Table.Cell key="Disposition">{disposition}</Table.Cell>
          <Table.Cell key="Comment">{comment}</Table.Cell>
        </Table.Row>
      );
    });
    const reportstate = this.state.reports;
    const reports = reportstate.map((reportInfo) => {
      const { link, name } = reportInfo;
      return (
        <div style={style1} key={name}>
          <Button
            as="a"
            target="_blank"
            style={style1}
            href={link}
            key={name}
            content={name}
            icon="download"
            labelPosition="left"
            label={{ /*href: (JSON.stringify(link)).replace(/\"/g, ''), */basic: true, color: 'green', content: 'Download' }}
          />
        </div>
      );
    });
    const parameterstate = (this.state.parameters);
    const parameters = parameterstate.map((parameterinfo) => {
      const { parameter, accuracy, value, adjust } = parameterinfo;
      return (
        <Table.Row key={parameter}>
          <Table.Cell key={parameter}>{parameter}</Table.Cell>
          <Table.Cell key={value}>{accuracy}</Table.Cell>
          <Table.Cell key={adjust}>{value}</Table.Cell>
          <Table.Cell key={accuracy}>{adjust}</Table.Cell>
        </Table.Row>
      );
    });
    const attachstate = this.state.attachments;
    const attachments = attachstate.map((attachInfo) => {
      const { link, filename } = attachInfo;
      return (
        <div style={style1} key={filename}>
          <Button
            as="a"
            style={style1}
            href={link}
            key={filename}
            content={filename}
            icon="download"
            labelPosition="left"
            label={{ /*href: (JSON.stringify(link)).replace(/\"/g, ''),*/ basic: true, color: 'green', content: 'Download' }}
          />
        </div>
      );
    });
    return (
      <Segment>
        <Dimmer active={this.state.loading} inverted>
          <Loader />
        </Dimmer>
        <br />
        <h1><Link to="/home/inprogress">TRAAS</Link></h1>
        <Divider horizontal>Out-of-Tolerance Condition #{this.id}</Divider>
        <br />
        <Table celled padded color="purple" >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Reported By</Table.HeaderCell>
              <Table.HeaderCell>Affected Start Date</Table.HeaderCell>
              <Table.HeaderCell>Affected End Date</Table.HeaderCell>
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
              <Table.Cell>{this.state.ReportedBy}</Table.Cell>
              <Table.Cell>{this.state.startdate}</Table.Cell>
              <Table.Cell>{this.state.enddate}</Table.Cell>
              <Table.Cell>{this.state.Date}</Table.Cell>
              <Table.Cell>{this.state.Asset}</Table.Cell>
              <Table.Cell>{this.state.Manufacturer}</Table.Cell>
              <Table.Cell>{this.state.Model}</Table.Cell>
              <Table.Cell>{this.state.Description}</Table.Cell>
              <Table.Cell>{this.state.Serial}</Table.Cell>
            </Table.Row>
          </Table.Body>
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="9" style={style}><strong>Disposition:</strong> {this.state.Disposition}</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell colSpan="9" style={style}><strong>Comment:</strong> {this.state.Comment}</Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <br />
        <Divider horizontal>TRAAS Addendums Affected</Divider>
        {this.state.reports.length === 0 &&
        <Message compact positive style={style2}>
          <Message.Header style={style}>No Addendums Affected</Message.Header>
        </Message>}
        {reports}
        <Divider horizontal>OOTC Data</Divider>
        {this.state.attachments.length === 0 && this.state.parameters.length === 0 &&
        <Message compact positive style={style2}>
          <Message.Header style={style}>No OOTC Data Available</Message.Header>
        </Message>}
        {attachments}
        {this.state.parameters.length > 0 &&
        <Table celled compact color="green">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Parameter</Table.HeaderCell>
              <Table.HeaderCell>MFG Accuracy</Table.HeaderCell>
              <Table.HeaderCell>Measured Value</Table.HeaderCell>
              <Table.HeaderCell>Adjusted OK</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {parameters}
          </Table.Body>
        </Table>}
        <Divider horizontal>Emails and Responses</Divider>
        <Table celled compact color="blue">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Badge</Table.HeaderCell>
              <Table.HeaderCell>Username</Table.HeaderCell>
              <Table.HeaderCell collapsing>Email</Table.HeaderCell>
              <Table.HeaderCell>Reason for Sending</Table.HeaderCell>
              <Table.HeaderCell collapsing>PI Disposition</Table.HeaderCell>
              <Table.HeaderCell>Comment</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {emails}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default connect()(OOTCReports);
