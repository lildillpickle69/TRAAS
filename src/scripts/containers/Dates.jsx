import React, { Component } from 'react';
import moment from 'moment';
import { DateRangeInput } from '@blueprintjs/datetime';

const Dates = ({ interval_start, interval_end}, formatDate, ...fields) => (
  <DateRangeInput
  allowSingleDayRange
  contiguousCalendarMonths="false"
  value={[(interval_start.input.value == "") ? null : interval_start.input.value ,(interval_end.input.value == "") ? null : interval_end.input.value]}
  formatDate={ (date) => {(date == null ? '' : formatDates(date))}}
  parseDate={ (date) => {new Date(date)}}
  onChange={(e) => {interval_start.input.onChange(e[0]); interval_end.input.onChange(e[1]);}}
  />
);

const formatDates = (value, name) => (
  moment(value).format('MM-DD-YYYY')
);

export default Dates;