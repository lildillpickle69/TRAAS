import React from 'react';
import { Table } from 'semantic-ui-react';

const Results = ({ ID, title, dates, pi, assets }) => (
  <Table.Row>
    <Table.Cell>{ID}</Table.Cell>
    <Table.Cell>{title}</Table.Cell>
    <Table.Cell>{dates}</Table.Cell>
    <Table.Cell>{pi}</Table.Cell>
    <Table.Cell>{assets}</Table.Cell>
  </Table.Row>
);

export default Results;
