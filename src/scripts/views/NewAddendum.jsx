// @flow

import React, { PureComponent } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import moment from 'moment';
import FormContainer from '../containers/FormContainer';
import { toggleModal } from '../actions';

class NewAddendum extends PureComponent {
  constructor(props) {
    super(props);
    this.id = (this.props.location.pathname).substring(11);
    this.submit = this.submit.bind(this);
  }
  submit(values) {
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    let create = (this.props.location.pathname).substring(11, 25);
    create = create.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1-$2-$3 $4:$5:$6');
    axios({
      method: 'post',
      url: 'https://agoquality-tmpw.aero.org/secure/TRAASweb/TRAAS.pl',
      data: {
        values,
        ID: this.id,
        Last_Modified: now,
        Create_Date: create,
      },
    })
      .then(() => {
        this.props.dispatch(toggleModal(true));
        window.open(`https://agoquality-tmpw.aero.org/tcpdf/examples/TRAAS_New.php?ID=${this.id}`);
      })
      .catch((err) => { console.log(err); });
  }
  render() {
    return (
      <FormContainer onSubmit={this.submit} ID={this.id} url={this.props.location.pathname} />
    );
  }
}

export default connect()(NewAddendum);
