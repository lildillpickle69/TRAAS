import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Renders each row of the search results for OOTCs page
const OOTCResults = ({ ID, asset, date, daterange }) => (
  <Table.Row>
    <Table.Cell><a href={`https://agoquality-tmpw.aero.org/TRAAS/index.php#/OOTC/${ID}`} target="_blank">{ID}</a></Table.Cell>
    <Table.Cell>{asset}</Table.Cell>
    <Table.Cell>{date}</Table.Cell>
    <Table.Cell>{daterange}</Table.Cell>
  </Table.Row>
);

OOTCResults.propTypes = {
  ID: PropTypes.string.isRequired,
  asset: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  daterange: PropTypes.string.isRequired
};

export default OOTCResults;
