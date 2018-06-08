import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid, Divider, Button, Message, Form, Modal } from 'semantic-ui-react';
import VirtualizedSelect from 'react-virtualized-select';
import axios from 'axios';
import { Link, Switch, Route } from 'react-router-dom';
import SearchAddendums from '../containers/SearchAddendums';
import TabBarContainer from '../containers/TabBarContainer';
import Addendums from './Addendums';
import FinalizedAddendums from './FinalizedAddendums';
import { selectTab, fetchAddendums } from '../actions';
import OOTCNotifications from './OOTCNotifications';

const buttonstyle = { marginLeft: 20 };
const badge = document.getElementById('badge').value;

/* Combines all finalized and inprogress addendums, for templating */
const mapStateToProps = state => ({
  templates: state.cards.finalized.concat(state.cards.inprogress)
});

const mapDispatchToProps = dispatch => ({
  fetchInprogress: (
    dispatch(fetchAddendums(badge, 0))
  ),
  fetchFinalized: (
    dispatch(fetchAddendums(badge, 1))
  )
});

const tabs = [
  { name: 'inprogress', label: 'My Addendums In Progress', linkname: '/home/inprogress' },
  { name: 'finalized', label: 'My Finalized Addendums', linkname: '/home/finalized' },
  { name: 'OOTCNotifications', label: 'Out-of-Tolerance Reports', linkname: '/home/OOTCNotifications' },
];

const style = { textAlign: 'center' };
class MainMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      template: null,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() { // Function to generate a new addendum from a template
    const date = new Date();
    const datestring = date.getFullYear() + (`0${date.getMonth() + 1}`).slice(-2) + (`0${date.getDate()}`).slice(-2) + (`0${date.getHours()}`).slice(-2) + (`0${date.getMinutes()}`).slice(-2) + (`0${date.getSeconds()}`).slice(-2) + badge;
    const newaddendumlink = `#/Addendums/${datestring}`;
    axios({
      method: 'post',
      url: 'https://agoquality-tmpw.aero.org/secure/TRAASweb/templates.pl',
      data: {
        ID: datestring,
        template: this.state.template.value,
      },
    })
      .then(() => {
        window.open(newaddendumlink);
      })
      .catch((err) => { console.log(err); });
  }
  render() {
    const options = this.props.templates.map((reportinfo) => {
      const { ID, name } = reportinfo;
      return ({
        label: `${name}: ${ID}`,
        value: ID,
      });
    });
    return (
      <div>
        <br />
        <Grid>
          <Grid.Column width={2}>
            <h1><Link to="/home/inprogress" onClick={() => { this.props.dispatch(selectTab('inprogress')); }}>TRAAS</Link></h1>
          </Grid.Column>
          <Grid.Column width={12}>
            <SearchAddendums />
          </Grid.Column>
          <Grid.Column width={2}>
            <h3>{badge}</h3>
          </Grid.Column>
        </Grid>
        <br />
        <Button
          onClick={() => {
            const date = new Date();
            const datestring = date.getFullYear() + (`0${date.getMonth() + 1}`).slice(-2) + (`0${date.getDate()}`).slice(-2) + (`0${date.getHours()}`).slice(-2) + (`0${date.getMinutes()}`).slice(-2) + (`0${date.getSeconds()}`).slice(-2) + badge;
            const newaddendumlink = `#/Addendums/${datestring}`;
            window.open(newaddendumlink); // Creates blank new addendum
          }}
          style={buttonstyle}
          primary
          content="New Addendum"
        />
        <Modal closeIcon="close" trigger={<Button color="green" content="New Addendum from existing" />}>
          <Modal.Header style={style}>Choose an existing addendum to generate a new addendum from.</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form onSubmit={this.handleSubmit} >
                <Form.Field>
                  <VirtualizedSelect options={options} onChange={template => this.setState({ template })} value={this.state.template} />
                </Form.Field>
                <Button content="Submit" type="submit" />
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
        <br />
        <Divider horizontal>Technical Reports Addendum Asset Summary and Out-Of-Tolerance Condition Database</Divider>
        <Grid centered textAlign="center" columns={2}>
          <Grid.Row>
            <Grid.Column>
              <Message compact positive style={style}>
                <Message.Header>What's New</Message.Header>
                <Message.List>
                  <Message.Item>Create addendums from existing ones</Message.Item>
                  <Message.Item>Add additional authors to addendums</Message.Item>
                  <Message.Item>Fully dynamic and responsive interface</Message.Item>
                  <Message.Item>Asset comments removed</Message.Item>
                  <Message.Item>Search for addendums and OOTCs</Message.Item>
                </Message.List>
              </Message>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <br />
        <TabBarContainer tabs={tabs} />
        <Switch>
          <Route exact path="/home/inprogress" component={Addendums} />
          <Route exact path="/home/finalized" component={FinalizedAddendums} />
          <Route exact path="/home/OOTCNotifications" component={OOTCNotifications} />
        </Switch>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
