import React from 'react';
import { Table } from 'semantic-ui-react';
import OOTCResults from './OOTCResults';

const OOTCResultsTable = ({ results }) => {
  if (results instanceof Array) {
    const table = results.map((resultInfo) => {
      const { ID, asset, date, daterange } = resultInfo;
      return (
        <OOTCResults
          key={ID}
          ID={ID}
          asset={asset}
          date={date}
          daterange={daterange}
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


export default OOTCResultsTable;
