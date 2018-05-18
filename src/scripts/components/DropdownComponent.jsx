import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import { AsyncCreatable } from 'react-select';
import PropTypes from 'prop-types';

const DropdownComponent = ({ loadOptions, input, multi, meta: { touched, error }, creatable, ...props }) => {
  if (multi) {
    return (
      <VirtualizedSelect
        async
        clearable
        loadOptions={loadOptions}
        {...input}
        onChange={(e) => { (e.length === 0) ? input.onChange(null) : input.onChange(e); }}
        onBlur={() => {(input.value === '') ? input.onBlur(null) : input.onBlur([...input.value])}}
        labelKey="label"
        valueKey="value"
        multi={multi}
        placeholder="Search to narrow results."
        selectComponent={creatable && AsyncCreatable}
        value={input.value || ''}
        {...props}
      />
    );
  }
  return (
    <VirtualizedSelect
      async
      clearable
      loadOptions={loadOptions}
      {...input}
      onChange={input.onChange}
      onBlur={() => input.onBlur(input.value)}
      labelKey="label"
      valueKey="value"
      multi={multi}
      placeholder="Search to narrow results."
      selectComponent={creatable && AsyncCreatable}
      value={input.value || null}
      {...props}
    />
  );
};

DropdownComponent.defaultProps = {
  creatable: false,
  multi: false,
};

DropdownComponent.propTypes = {
  creatable: PropTypes.bool,
  multi: PropTypes.bool
};

export default DropdownComponent;
