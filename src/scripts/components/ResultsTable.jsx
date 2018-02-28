import React from 'react';
import { Table } from 'semantic-ui-react';
import Results from './Results';

const ResultsTable = ({ results }) => {
  if (results instanceof Array) {
    const table = results.map((resultInfo) => {
      const { ID, title, dates, pi, assets } = resultInfo;
      return (
        <Results
          key={ID}
          ID={ID}
          title={title}
          dates={dates}
          pi={pi}
          assets={assets}
        />
      );
    });
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Addendum ID</Table.Cell>
            <Table.Cell>Title</Table.Cell>
            <Table.Cell>Dates</Table.Cell>
            <Table.Cell>PI Name</Table.Cell>
            <Table.Cell>Assets</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{table}</Table.Body>
      </Table>
    );
  } return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.Cell>Addendum ID</Table.Cell>
          <Table.Cell>Title</Table.Cell>
          <Table.Cell>Dates</Table.Cell>
          <Table.Cell>PI Name</Table.Cell>
          <Table.Cell>Assets</Table.Cell>
        </Table.Row>
        <Table.Body />
      </Table.Header>
    </Table>
  );
};


export default ResultsTable;
