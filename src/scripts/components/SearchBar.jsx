import React from 'react';
import { Search, Label } from 'semantic-ui-react';

const SearchAddendums = (props) => {
  const { searchloading, results, value, onSearchChange, ...otherProps } = props;
  const categoryRenderer = ({ name }) =>
    (<a href={`https://agoquality-tmpw.aero.org/tcpdf/examples/TRAAS.php?ID=${name}`} target="_blank">
      <Label as={'span'} content={name} />
    </a>);
  // const resultRenderer = ({ name, title, description }) => (
  //   <a href={`https://agoquality-tmpw.aero.org/tcpdf/examples/TRAAS.php?ID=${name}`} target="_blank">
  //     <p>
  //       {title}
  //       <br />
  //       {description}
  //     </p>
  //   </a>
  // );
  return (
    <Search
      category
      fluid
      loading={searchloading}
      results={results}
      onSearchChange={e => setInterval(onSearchChange(e.target.value), 500)}
      /*resultRenderer={resultRenderer}*/ 
      categoryRenderer={categoryRenderer}
      {...otherProps}
    />
  );
};

export default SearchAddendums;
