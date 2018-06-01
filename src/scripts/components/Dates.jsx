import React from 'react';
import moment from 'moment';
import { DateRangeInput } from '@blueprintjs/datetime';
import { Form, Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';

//Component that renders the date field on the addendum form.

const formatDates = value => (
  moment(value).format('MM-DD-YYYY')
);

const Dates = ({ interval_start, interval_end }) => {
  const error = (interval_start.meta.error || interval_end.meta.error) && (interval_start.meta.touched && interval_end.meta.touched);
  return (
    <div>
      <Form.Field required>
        <label>Select or type the dates.</label>
        <DateRangeInput
          allowSingleDayRange
          contiguousCalendarMonths="false"
          value={[interval_start.input.value, interval_end.input.value]}
          formatDate={value => (value === '' ? null : formatDates(value))}
          parseDate={(date) => {new Date(date)}}
          onChange={(e) => {
              interval_start.input.onChange(e[0]);
              interval_start.input.onBlur(e[0]);
              interval_end.input.onChange(e[1]);
              interval_end.input.onBlur(e[1]);
            }}
          placeholder="custom"
        />
      </Form.Field>
      <Message error visible={error} header="Field Required" content="Please fill out this field." />
    </div>
  );
};

Dates.propTypes = {
  interval_start: PropTypes.objectOf(PropTypes.object).isRequired,
  interval_end: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Dates;
