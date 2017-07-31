import React from 'react';
import { DateRangePicker } from 'react-dates';
import { Form } from 'semantic-ui-react';

const DateComponent = ({ onDatesChange, onFocusChange, startDate, endDate, focusedInput }) => (
  <Form.Field>
    <DateRangePicker
      onDatesChange={onDatesChange}
      onFocusChange={onFocusChange}
      focusedInput={focusedInput}
      startDate={startDate}
      endDate={endDate}
      isOutsideRange={() => false}
    />
  </Form.Field>
);

export default DateComponent;
