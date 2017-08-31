import React from 'react';
import { Table } from 'semantic-ui-react';

const AssetRow = ({ value, manufacturer, model, description }) => (
  <Table.Row>
    <Table.Cell>{value}</Table.Cell>
    <Table.Cell>{manufacturer}</Table.Cell>
    <Table.Cell>{model}</Table.Cell>
    <Table.Cell>{description}</Table.Cell>
  </Table.Row>
);

export default AssetRow;
