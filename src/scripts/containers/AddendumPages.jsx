import React from 'react';
import { Pagination, Grid, Table, Button } from 'semantic-ui-react';
import { ResultsTable, OOTCResultsTable } from '../components';

class AddendumPages extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activePage : 1,
      AddendumTab: true,
    }
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }
  handlePageChange(e, { activePage }) {
    this.setState ({ activePage });
  }
  handleTabChange(e, { activeTab }) {
    this.setState ({ AddendumTab: !this.state.AddendumTab, activePage: 1 });
  }
  render() {
    if (this.state.AddendumTab) {
    const totalpages = Math.ceil(this.props.addendumresults.length / 15.0);
    const firstitem = (this.state.activePage - 1) * 15;
    const lastitem = this.state.activePage * 15;
    return (
      <Grid centered columns={3}>
        <Grid.Column width={12} textAlign="center">
        <Table celled color="yellow" fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Addendum ID</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Dates</Table.HeaderCell>
              <Table.HeaderCell>PI Name</Table.HeaderCell>
              <Table.HeaderCell>Assets</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <ResultsTable results={this.props.addendumresults.slice(firstitem, lastitem)} />
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                <Button content="OOTCS" onClick={this.handleTabChange} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <Pagination
          activePage={this.state.activePage}
          totalPages={totalpages > 0 ? totalpages : 1 }
          onPageChange={this.handlePageChange}
        />
        </Grid.Column>
      </Grid>
    );
    }
    else {
    const totalpages = Math.ceil(this.props.ootcresults.length / 15.0);
    const firstitem = (this.state.activePage - 1) * 15;
    const lastitem = this.state.activePage * 15;
    return (
      <Grid centered columns={3}>
        <Grid.Column width={7} textAlign="center">
        <Table celled color="yellow" fixed singleLine collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>OOTC ID</Table.HeaderCell>
              <Table.HeaderCell>Asset Affected</Table.HeaderCell>
              <Table.HeaderCell>Date Reported</Table.HeaderCell>
              <Table.HeaderCell>Affected Date Range</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <OOTCResultsTable results={this.props.ootcresults.slice(firstitem, lastitem)} />
          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Button content="Addendums" onClick={this.handleTabChange} />
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <Pagination
          activePage={this.state.activePage}
          totalPages={totalpages > 0 ? totalpages : 1 }
          onPageChange={this.handlePageChange}
        />
        </Grid.Column>
      </Grid>
    );

    }   
  }
}

export default AddendumPages;