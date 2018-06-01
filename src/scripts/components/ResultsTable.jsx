import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Results from './Results';

//Table of all the search results.
const ResultsTable = ({ results }) => {
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
};

ResultsTable.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ResultsTable;
