import React from 'react';
import { Table } from 'semantic-ui-react';
import AssetRow from './AssetRow';

const AssetTable = ({ assets }) => {
  if (assets instanceof Array) {
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
  } return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>Manufacturer</Table.Cell>
          <Table.Cell>Model</Table.Cell>
          <Table.Cell>Description</Table.Cell>
        </Table.Row>
        <Table.Body />
      </Table.Header>
    </Table>
  );
};


export default AssetTable;
