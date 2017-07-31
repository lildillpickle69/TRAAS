// import React, { PureComponent } from 'react';
// import VirtualizedSelect from 'react-virtualized-select';
// import { Creatable } from 'react-select';
// import axios from 'axios';
// import createFilterOptions from 'react-select-fast-filter-options';

// export default class KeywordsDropdown extends PureComponent { 
//   constructor(props) {
//     super(props);
//     this.state = {};
//     this.handleChange = this.handleChange.bind(this);
//   }

//   componentDidMount() {
//     axios
//       .get('https://agoquality-tmpw.aero.org/secure/TRAASweb/keywords.pl?query=')
//       .then((response) => {
//         this.setState({
//           options: response.data.results,
//         });
//       })
//       .catch((err) => { console.log(err); });
//   }
//   // shouldComponentUpdate(nextProps, nextState) {
//   //   if (this.state.selectedKeywords !== nextState.selectedKeywords) {
//   //     return true;
//   //   }
//   //   return false;
//   // }
//   handleChange(selectedKeywords) {
//     this.setState({ selectedKeywords }, () => this.props.getkeywords('keywords', selectedKeywords));
//   }
//   render() {
//     const options = this.state.options;
//     const filterOptions = createFilterOptions({ options });
//     return (
//       <VirtualizedSelect
//         autofocus
//         clearable
//         filterOptions={filterOptions}
//         labelKey="label"
//         multi
//         onChange={this.handleChange}
//         options={options}
//         value={this.state.selectedKeywords}
//         selectComponent={Creatable}
//         valueKey="value"
//       />
//     );
//   }
// }
