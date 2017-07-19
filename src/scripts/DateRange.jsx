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
    this.setState({ startDate }, () => {
      const date = startDate.toISOString().substring(0, 10);
      return this.props.getdates('startDate', date);
    });
    this.setState({ endDate }, () => {
      const date = endDate.toISOString().substring(0, 10);
      return this.props.getdates('endDate', date);
    });
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
