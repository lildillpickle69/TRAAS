// import React, { PureComponent } from 'react';
// import axios from 'axios';
// import VirtualizedSelect from 'react-virtualized-select';

// export default class AuthorsDropdown extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {};
//     this.handleChange = this.handleChange.bind(this);
//     this.getOptions = this.getOptions.bind(this);
//   }
//   getOptions(input) {
//     return axios
//       .get('https://agoquality-tmpw.aero.org/secure/TRAASweb/authors.pl?query=' + input)
//       .then((response) => {
//         return { options: response.data.results };
//       })
//       .catch((err) => { console.log(err); });
//   }
//   // componentDidMount() {
//   //   axios
//   //     .get('https://agoquality-tmpw.aero.org/secure/TRAASweb/authors.pl?query=')
//   //     .then((response) => {
//   //       this.setState({
//   //         options: response.data.results,
//   //       });
//   //     })
//   //     .catch((err) => { console.log(err); });
//   // }
//   // shouldComponentUpdate(nextProps, nextState) {
//   //   if (this.state.selectedAuthors !== nextState.selectedAuthors) {
//   //     return true;
//   //   }
//   //   return false;
//   // }
//   handleChange(selectedAuthors) {
//     this.setState({ selectedAuthors }, () => this.props.getauthors('authors', selectedAuthors));
//   }
//   render() {
//     // const options = this.state.options;
//     // const filterOptions = createFilterOptions({ options });
//     return (
//       <VirtualizedSelect
//         async
//         clearable
//         autofocus
//         multi
//         loadOptions={this.getOptions}
//         labelKey="label"
//         onChange={this.handleChange}
//         value={this.state.selectedAuthors}
//         valueKey="value"
//       />
//     );
//   }
// }

