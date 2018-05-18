import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const AssetRow = ({ value, manufacturer, model, description }) => (
  <Table.Row>
    <Table.Cell>{value}</Table.Cell>
    <Table.Cell>{manufacturer}</Table.Cell>
    <Table.Cell>{model}</Table.Cell>
    <Table.Cell>{description}</Table.Cell>
  </Table.Row>
);

AssetRow.propTypes = {
  value: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  manufacturer: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
export default AssetRow;
