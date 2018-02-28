import React from 'react';
import { Search } from 'semantic-ui-react';

const style = { color: 'inherit' };
const SearchAddendums = (props) => {
  const { searchloading, results, value, onSearchChange, onSearchQuery, ...otherProps } = props;
  // const categoryRenderer = ({ name }) =>
  //   (<a href={`https://agoquality-tmpw.aero.org/tcpdf/examples/TRAAS.php?ID=${name}`} target="_blank">
  //     <Label as={'span'} content={name} />
  //   </a>);
  const resultRenderer = ({ name, title, description, ID }) => {
    const formatted = title.split('\n').map(i => (
      <div>{i}</div>));
    const formatteddesc = description.split('\n').map(i => (
      <div>{i}</div>));
    return (<a style={style} href={name === 'Addendums' ? `https://agoquality-tmpw.aero.org/tcpdf/examples/TRAAS.php?ID=${ID}` : `https://agoquality-tmpw.aero.org/TRAAS/index.php#/OOTC/${ID}`} target="_blank" key={title}>
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
      onKeyPress={e => (e.key === 'Enter' ? onSearchQuery(e.target.value) : null)}
      /*categoryRenderer={categoryRenderer}*/
      {...otherProps}
    />
  );
};

export default SearchAddendums;
