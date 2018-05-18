import React, { PureComponent } from 'react';
import axios from 'axios';
import { Form, Table, Segment, Dimmer, Loader, Divider, Message, Button, Modal, Header } from 'semantic-ui-react';
import VirtualizedSelect from 'react-virtualized-select';

const style2 = { left: '43%', textAlign: 'center' };
const style = { textAlign: 'center' };

class OOTCNotifications extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pending: [],
      past: [],
      loading: true,
      selectValue: null,
      explanation: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    axios.get('https://agoquality-tmpw.aero.org/secure/TRAASweb/Notifications.pl?')
      .then((response) => {
        this.setState({
          loading: false,
          pending: response.data.pending,
          past: response.data.past,
        });
      })
      .catch(err => console.log(err));
  }
  handleSubmit(ID, report) {
    axios({
      method: 'post',
      url: 'https://agoquality-tmpw.aero.org/secure/TRAASweb/OOTCResponses.pl',
      data: {
        impact: this.state.selectValue,
        explanation: this.state.explanation,
        ID,
        report,
      },
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((err) => { console.log(err); });
  }
  handleChange(e) {
    this.setState({ explanation: e.target.value });
  }
  render() {
    const pendingstate = (this.state.pending);
    const options = [{ label: 'IMPACT', value: 'IMPACT' }, { label: 'NO IMPACT', value: 'NO IMPACT' }];
    const pending = pendingstate.map((pendingInfo) => {
      const { Asset, Manufacturer, Start, Model, End, Description, Report, ID, ReportId } = pendingInfo;
      return (
        <Table.Row key={ID}>
          <Table.Cell key={Asset}>{Asset}</Table.Cell>
          <Table.Cell key={Manufacturer}>{Manufacturer}</Table.Cell>
          <Table.Cell key={Model}>{Model}</Table.Cell>
          <Table.Cell key={Description}>{Description}</Table.Cell>
          <Table.Cell key={Start}>{Start}</Table.Cell>
          <Table.Cell key={End}>{End}</Table.Cell>
          <Table.Cell key={Report}>{Report}</Table.Cell>
          <Table.Cell key={ID}><a href={`https://agoquality-tmpw.aero.org/TRAAS/index.php#/OOTC/${ID}`} target="_blank">{ID}</a></Table.Cell>
          <Table.Cell key="impact">
            <Modal closeIcon="close" trigger={<Button color="green" content="Fill out" />}>
              <Modal.Header style={style}>Affected Report: {Report}</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Header>Provide explanation as to why Impact or No Impact:</Header>
                  <Form onSubmit={() => { this.handleSubmit(ID, ReportId); }} >
                    <Form.TextArea rows={7} autoHeight onChange={this.handleChange} />
                    <Form.Field>
                      <VirtualizedSelect options={options} onChange={selectValue => this.setState({ selectValue })} value={this.state.selectValue} />
                    </Form.Field>
                    <Button type="submit" content="Submit" style={style2} /*onClick={window.location.reload()}*/ />
                  </Form>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </Table.Cell>
        </Table.Row>
      );
    });
    const paststate = (this.state.past);
    const past = paststate.map((pastInfo) => {
      const { Asset, Manufacturer, Start, Model, End, Description, Report, ID, Disposition } = pastInfo;
      return (
        <Table.Row key={ID}>
          <Table.Cell key={Asset}>{Asset}</Table.Cell>
          <Table.Cell key={Manufacturer}>{Manufacturer}</Table.Cell>
          <Table.Cell key={Model}>{Model}</Table.Cell>
          <Table.Cell key={Description}>{Description}</Table.Cell>
          <Table.Cell key={Start}>{Start}</Table.Cell>
          <Table.Cell key={End}>{End}</Table.Cell>
          <Table.Cell key={Report}>{Report}</Table.Cell>
          <Table.Cell key={ID}><a href={`https://agoquality-tmpw.aero.org/TRAAS/index.php#/OOTC/${ID}`} target="_blank">{ID}</a></Table.Cell>
          <Table.Cell key={Disposition}>{Disposition}</Table.Cell>
        </Table.Row>
      );
    });
    return (
      <Segment>
        <Dimmer active={this.state.loading} inverted>
          <Loader />
        </Dimmer>
        <Divider horizontal>Pending Notifications</Divider>
        {this.state.pending.length === 0 &&
        <Message compact positive style={style2}>
          <Message.Header style={style}>No Pending Notifications</Message.Header>
        </Message>}
        {this.state.pending.length > 0 &&
        <Table celled padded color="pink">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Asset</Table.HeaderCell>
              <Table.HeaderCell>Manufacturer</Table.HeaderCell>
              <Table.HeaderCell>Model</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Affected Start Date</Table.HeaderCell>
              <Table.HeaderCell>Affected End Date</Table.HeaderCell>
              <Table.HeaderCell>Affected Report</Table.HeaderCell>
              <Table.HeaderCell>OOTC</Table.HeaderCell>
              <Table.HeaderCell>PI Disposition</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {pending}
          </Table.Body>
        </Table>}
        <Divider horizontal>Past Notifications</Divider>
        {this.state.past.length === 0 &&
        <Message compact positive style={style2}>
          <Message.Header style={style}>No Past Notifications</Message.Header>
        </Message>}
        {this.state.past.length > 0 && <Table celled padded color="yellow" >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Asset</Table.HeaderCell>
              <Table.HeaderCell>Manufacturer</Table.HeaderCell>
              <Table.HeaderCell>Model</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Affected Start Date</Table.HeaderCell>
              <Table.HeaderCell>Affected End Date</Table.HeaderCell>
              <Table.HeaderCell>Affected Report</Table.HeaderCell>
              <Table.HeaderCell>OOTC</Table.HeaderCell>
              <Table.HeaderCell>PI Disposition</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {past}
          </Table.Body>
        </Table>}
      </Segment>
    );
  }
}

export default OOTCNotifications;
