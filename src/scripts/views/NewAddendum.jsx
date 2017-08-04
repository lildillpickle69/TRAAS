import React, { PureComponent } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import FormContainer from '../containers/FormContainer';
import { toggleModal } from '../actions';


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

class NewAddendum extends PureComponent {
  constructor(props) {
    super(props);
    this.id = (this.props.location.pathname).substring(11);
    this.state = {
      exists: null,
      permission: this.id.length === 19,
    };
    this.submit = this.submit.bind(this);
  }
  submit(values) {
    console.log(values);
    axios({
      method: 'post',
      url: 'https://agoquality-tmpw.aero.org/secure/TRAASweb/TRAAS.pl',
      data: {
        values,
        ID: this.id,
      },
    })
      .then((response) => {
        this.props.dispatch(toggleModal(true));
        console.log(response);
      })
      .catch((err) => { console.log(err); });
  }
  componentDidMount() {
    axios.get(`https://agoquality-tmpw.aero.org/secure/TRAASweb/data.pl?query=${this.id}`)
      .then((response) => {
        this.setState({
          exists: response.data.results[0].exists === 'true',
          permission: response.data.results[0].permission === 'true',
        });
      })
      .catch((err) => { console.log(err); });
  }
  render() {
    return (
      <FormContainer exists={this.state.exists} onSubmit={this.submit} number={this.id} ID={this.id} permission={this.state.permission} />
    );
  }
}

export default connect()(NewAddendum);
