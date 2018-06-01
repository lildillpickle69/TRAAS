import React from 'react';
import { Search } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// Renders the search bar, the results for the search bar
const style = { color: 'inherit' };
const SearchAddendums = (props) => {
  const { searchloading, results, value, onSearchChange, onSearchQuery, ...otherProps } = props;
  const resultRenderer = ({ name, title, description, ID }) => {
    const formatted = title.split('\n').map(i => (
      <div>{i}</div>));
    const formatteddesc = description.split('\n').map(i => (
      <div>{i}</div>));
    return (
      <a style={style} href={name === 'Addendums' ? `https://agoquality-tmpw.aero.org/tcpdf/examples/TRAAS.php?ID=${ID}` : `https://agoquality-tmpw.aero.org/TRAAS/index.php#/OOTC/${ID}`} target="_blank" key={title}>
        <div style={style}>
          <strong>{formatted}</strong>
          {formatteddesc}
        </div>
      </a>);
  };
  return (
    <Search
      category
      fluid
      loading={searchloading}
      results={results}
      onSearchChange={e => setInterval(onSearchChange(e.target.value), 500)}
      resultRenderer={resultRenderer}
      onKeyPress={e => (e.key === 'Enter' ? onSearchQuery(e.target.value) : null)} // If you press enter, this opens a new tab that returns all the search results for the query
      {...otherProps}
    />
  );
};
SearchAddendums.defaultProps = {
  searchloading: false,
  results: [],
};

SearchAddendums.propTypes = {
  searchloading: PropTypes.bool,
  results: PropTypes.arrayOf(PropTypes.object),
  onSearchChange: PropTypes.func.isRequired,
  onSearchQuery: PropTypes.func.isRequired
};

export default SearchAddendums;
