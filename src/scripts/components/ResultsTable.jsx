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
      <Table.Body>
        {table}
      </Table.Body>);
  } return (
    <Table.Body />
  );
};


export default ResultsTable;
