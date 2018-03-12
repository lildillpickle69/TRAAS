import React from 'react';
import { Table } from 'semantic-ui-react';

const Results = ({ ID, title, dates, pi, assets }) => (
  <Table.Row>
    <Table.Cell><a href={`https://agoquality-tmpw.aero.org/tcpdf/examples/TRAAS.php?ID=${ID}`} target="_blank">{ID}</a></Table.Cell>
    <Table.Cell>{title}</Table.Cell>
    <Table.Cell>{dates}</Table.Cell>
    <Table.Cell>{pi}</Table.Cell>
    <Table.Cell>{assets}</Table.Cell>
  </Table.Row>
);

export default Results;
