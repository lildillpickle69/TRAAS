import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import AssetRow from './AssetRow';

//Table of all assets
const AssetTable = ({ assets }) => {
  const table = assets.map((assetInfo) => {
    const { value, Description, Manufacturer, Model } = assetInfo;
    return (
      <AssetRow
        key={value}
        value={value}
        description={Description}
        manufacturer={Manufacturer}
        model={Model}
      />
    );
  });
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Manufacturer</Table.HeaderCell>
          <Table.HeaderCell>Model</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{table}</Table.Body>
    </Table>
  );
};

AssetTable.propTypes = {
  assets: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default AssetTable;
