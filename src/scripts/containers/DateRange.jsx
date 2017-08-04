import React from 'react';
import { DateRangePicker } from 'react-dates';
import { START_DATE, END_DATE } from 'react-dates/constants';
import moment from 'moment';

class DateRangePickerWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
    };
    this.handleDatesChange = this.handleDatesChange.bind(this);
    this.handleFocusChange = this.handleFocusChange.bind(this);
  }

  handleDatesChange(dates) {
    const startField = this.props[this.props.startDateFieldName];
    const endField = this.props[this.props.endDateFieldName]; 
    startField.input.onChange(dates.startDate);
    endField.input.onChange(dates.endDate);
  }

  handleFocusChange(focusedInput) {
    this.setState({ focusedInput });
    if (focusedInput === START_DATE) {
      this.props[this.props.startDateFieldName].input.onFocus();
      return;
    }
    if (focusedInput === END_DATE) {
      this.props[this.props.endDateFieldName].input.onFocus();
      return;
    }
  }

  render() {
    const startdate = this.props[this.props.startDateFieldName].input.value || null;
    const enddate = this.props[this.props.endDateFieldName].input.value || null;
    const endDateMoment = moment(enddate);
    const endDate = endDateMoment.isValid() ? endDateMoment : null;
    const startDateMoment = moment(startdate);
    const startDate = startDateMoment.isValid() ? startDateMoment : null;
    return (
      <DateRangePicker
        endDate={endDate}
        endDatePlaceholderText="End Date"
        focusedInput={this.state.focusedInput || null}
        minimumNights={0}
        onDatesChange={this.handleDatesChange}
        onFocusChange={this.handleFocusChange}
        startDate={startDate}
        startDatePlaceholderText="Start Date"
        isOutsideRange={() => false}
      />
    );
  }
}
export default DateRangePickerWrapper;













// import { connect } from 'react-redux';
// import { DateComponent } from '../components';
// import { selectDates, selectFocus } from '../actions/';
// import { selectStartDate, selectEndDate, selectFocusedInput } from '../reducers';

// const mapStateToProps = (state) => {
//   const startDate = selectStartDate(state);
//   const endDate = selectEndDate(state);
//   const focusedInput = selectFocusedInput(state);
//   return { startDate, endDate, focusedInput };
// };

// const actions = {
//   onFocusChange: selectFocus,
//   onDatesChange: selectDates,
// };

// export default connect(mapStateToProps, actions)(DateComponent);

