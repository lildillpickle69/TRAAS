import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Renders each row of the search results for Addendums page
const Results = ({ ID, title, dates, pi, assets }) => (
  <Table.Row>
    <Table.Cell><a href={`https://agoquality-tmpw.aero.org/tcpdf/examples/TRAAS.php?ID=${ID}`} target="_blank">{ID}</a></Table.Cell>
    <Table.Cell>{title}</Table.Cell>
    <Table.Cell>{dates}</Table.Cell>
    <Table.Cell>{pi}</Table.Cell>
    <Table.Cell>{assets}</Table.Cell>
  </Table.Row>
);
Results.defaultProps = {
  title: '',
  dates: '',
  pi: '',
  assets: ''
};

Results.propTypes = {
  ID: PropTypes.string.isRequired,
  title: PropTypes.string,
  dates: PropTypes.string,
  pi: PropTypes.string,
  assets: PropTypes.string
};
export default Results;
