import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import OOTCResults from './OOTCResults';

const OOTCResultsTable = ({ results }) => {
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
};

OOTCResultsTable.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default OOTCResultsTable;
