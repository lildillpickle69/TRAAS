import React, { Component } from 'react';
import moment from 'moment';
import { DateRangeInput } from '@blueprintjs/datetime';
import { Form, Message } from 'semantic-ui-react';
const formatDates = (value, name) => (
  moment(value).format('MM-DD-YYYY')
);

export const Dates = ({ interval_start, interval_end}, formatDate, ...fields) => {
  const error = (interval_start.meta.error || interval_end.meta.error) && (interval_start.meta.touched && interval_end.meta.touched);
  // console.log(interval_start.meta);
  return (
    <div>
      <Form.Field required>
        <label>Select or type the dates.</label>
        <DateRangeInput
        allowSingleDayRange
        contiguousCalendarMonths="false"
        value={[interval_start.input.value, interval_end.input.value]}
        formatDate={(value) => (value === '' ? null : formatDates(value))}
        parseDate={ (date) => {new Date(date)}}
        onChange={(e) => {interval_start.input.onChange(e[0]); interval_end.input.onChange(e[1]);}}
        {...fields}
        onBlur={(e) =>{console.log(e); interval_start.input.onBlur(e)}}
        onBlur={(e) =>{console.log(e); interval_start.input.onBlur(e)}}
        placeholder="custom"
      />
      </Form.Field>
      <Message error visible={error} header="Field Required" content="Please fill out this field." />
  </div>
)
}; 