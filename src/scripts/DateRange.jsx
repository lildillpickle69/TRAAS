import React from 'react';
import { DateRangePicker } from 'react-dates';

class DateRange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: null,
      endDate: null,
    };

    this.onDatesChange = this.onDatesChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate });
  }

  onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    return (
      <div>
        <DateRangePicker
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={this.state.focusedInput}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          isOutsideRange={() => false}
        />
      </div>
    );
  }
}
export default DateRange;
