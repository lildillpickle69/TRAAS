import React, { PureComponent } from 'react';
import { Form, Divider, Grid } from 'semantic-ui-react';
import axios from 'axios';
import { Field, reduxForm } from 'redux-form';
import FormContainer from '../containers/FormContainer'
// import DateRange from './DateRange';
// import AuthorsDropdown from './AuthorsDropdown';
// import AssetsDropdown from './AssetsDropdown';
// import KeywordsDropdown from './KeywordsDropdown';
// import PiDropdown from './PiDropdown';


/* 
Load data -> if data is blank, just generate empty form.
If data is not blank, check if user is authorized. 
If not authorized, put a user is not authorized message.
Otherwise, load data normally;

*/

export default class NewAddendum extends PureComponent {
  constructor(props) {
    super(props);
    this.id = (this.props.location.pathname).substring(11);
    this.addendumexists = false;
    axios.get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/data.pl?query=${this.id}`)
      .then((response) => {
        this.addendumexists = (response.data.results.length >= 0) ? true : false;
      })
      .catch((err) => { console.log(err); });
    console.log(this.addendumexists);
  }
  render() {
    return (
      <FormContainer exists={this.addendumexists} number={this.id} />
    );
  }
}

// export default class Addendums extends PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       startDate: '',
//       endDate: '',
//       authors: [],
//       keywords: [],
//       assets: [],
//       title: '',
//       jo: '',
//       reportnumber: '',
//       program: '',
//       description: '',
//       nonaerospace: '',
//       pi: '',
//       submittedJO: '',
//       submittedPi: '',
//       submittedNonAerospace: '',
//       submittedDescription: '',
//       submittedProgram: '',
//       submittedReportNumber: '',
//       submittedTitle: '',
//       submittedAuthors: [],
//       submittedKeywords: [],
//       submittedAssets: [],
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleElementChange = this.handleElementChange.bind(this);
//   }
//   handleSubmit() {
//     const { pi, title, jo, reportnumber, program, description, nonaerospace, authors, keywords, assets, startDate, endDate } = this.state;
//     const submittedKeywords = [];
//     const submittedAssets = [];
//     const submittedAuthors = [];
//     let querystring = 'https://agoquality-tmpw.aero.org/secure/TRAASweb/OOTC.pl?';
//     keywords.forEach(element =>
//       submittedKeywords.push(element.value));
//     authors.forEach(element =>
//       submittedAuthors.push(element.value));
//     assets.forEach((element, index) => {
//       if (index === (assets.length - 1)) {
//         querystring += 'asset=' + element.value;
//       } else {
//         querystring += 'asset=' + element.value + '&';
//       }
//       return submittedAssets.push(element.value);
//     });
//     // querystring += 'startdate=' + startDate + '&enddate=' + endDate;
//     console.log(querystring);
//     axios
//       .get(querystring)
//       .then(response => console.log(response))
//       .catch(err => console.log(err));
//     this.setState({ submittedPi: pi.value,
//       submittedTitle: title,
//       submittedJO: jo,
//       submittedReportNumber: reportnumber,
//       submittedProgram: program,
//       submittedDescription: description,
//       submittedNonAerospace: nonaerospace,
//       submittedStartDate: startDate,
//       submittedEndDate: endDate,
//       submittedAssets,
//       submittedAuthors,
//       submittedKeywords }, () => axios
//       .post('https://agoquality-tmpw.aero.org/secure/TRAASweb/TRAAS.pl', this.state)
//       .then(response => console.log(response))
//       .catch(errors => console.log(errors)));
//   }
//   handleChange(e, { name, value }) {
//     this.setState({ [name]: value });
//   }
//   handleElementChange(name, value) {
//     this.setState({ [name]: value });
//   }
//   // generateDraft() {
//   //   const win = window.open('https://agoquality-tmpw.aero.org/tcpdf/examples/TRAAS.php?ID=' + ID, '_blank');
//   //   win.focus();
//   // }
//   render() {
//     const center = { position: 'relative', left: '40%' };
//     return (
//       <Form>
//         <Divider horizontal>Addendum #SOMETHING</Divider>
//         <br />
//         <Form.Group width="equal">
//           <Grid celled="internally" verticalAlign="middle" stackable centered>
//             <Grid.Row>
//               <Grid.Column width={4}>
//                 <Form.Field
//                   id="dates"
//                   label="Select or type the dates in the format YYYY/MM/DD."
//                   control={DateRange}
//                   name="dates"
//                   getdates={this.handleElementChange}
//                 />
//               </Grid.Column>
//               <Grid.Column width={2}>
//                 <Form.Input required id="title" label="Report Title" placeholder="Report Title" name="title" onChange={this.handleChange} />
//               </Grid.Column>
//               <Grid.Column width={3}>
//                 <Form.Field required id="pi" label="PI name" control={PiDropdown} getpi={this.handleElementChange} name="pi" />
//               </Grid.Column>
//               <Grid.Column width={3}>
//                 <Form.Field id="authors" label="Additional Authors" control={AuthorsDropdown} getauthors={this.handleElementChange} name="authors" />
//               </Grid.Column>
//               <Grid.Column width={2}>
//                 <Form.Input id="jo" label="JO" placeholder="JO" name="jo" onChange={this.handleChange} />
//               </Grid.Column>
//             </Grid.Row>
//           </Grid>
//         </Form.Group>
//         <br />
//         <Form.Group>
//           <Grid centered celled="internally" verticalAlign="middle" stackable>
//             <Grid.Row>
//               <Grid.Column width={4}>
//                 <Form.Input id="reportnumber" label="Report Number" placeholder="Report Number" name="reportnumber" onChange={this.handleChange} />
//               </Grid.Column>
//               <Grid.Column width={4}>
//                 <Form.Field required control={AssetsDropdown} label="Assets" id="assets" name="assets" getassets={this.handleElementChange} />
//               </Grid.Column>
//               <Grid.Column width={4}>
//                 <Form.Field control={KeywordsDropdown} label="Keywords" id="keywords" name="keywords" getkeywords={this.handleElementChange} />
//               </Grid.Column>
//               <Grid.Column width={3}>
//                 <Form.Input id="program" label="Program" placeholder="Program" name="program" onChange={this.handleChange} />
//               </Grid.Column>
//             </Grid.Row>
//           </Grid>
//         </Form.Group>
//         <br />
//         <Form.Group width="equal">
//           <Grid centered celled="internally" verticalAlign="middle" stackable>
//             <Grid.Row>
//               <Grid.Column width={12} >
//                 <Form.TextArea id="description" label="Description" rows={4} onChange={this.handleChange} name="description" />
//               </Grid.Column>
//             </Grid.Row>
//           </Grid>
//         </Form.Group>
//         <Form.Group width="equal">
//           <Grid centered celled="internally" verticalAlign="middle" stackable>
//             <Grid.Row>
//               <Grid.Column width={12} >
//                 <Form.TextArea
//                   id="nonaerospace"
//                   label="NON Aerospace MTE: Provide Agency, Property Identification Number, Manufacturer, Model and Calibration Date."
//                   rows={4}
//                   onChange={this.handleChange}
//                   name="nonaerospace"
//                 />
//               </Grid.Column>
//             </Grid.Row>
//           </Grid>
//         </Form.Group>
//         <Form.Group inline style={center}>
//           <Form.Button primary onClick={this.handleSubmit}>Save</Form.Button>
//           <Form.Button>Generate Draft</Form.Button>
//           <Form.Button>Finalize</Form.Button>
//         </Form.Group>
//       </Form>
//     );
//   }
// }

