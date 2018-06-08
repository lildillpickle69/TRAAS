import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import { AsyncCreatable } from 'react-select';
import PropTypes from 'prop-types';

// Renders all of the dropdown menus. The onChange/onBlur functions can be buggy, it's a good place to start if a dropdown breaks.
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
  multi: false,
};

DropdownComponent.propTypes = {
  multi: PropTypes.bool,
<<<<<<< HEAD
  loadOptions: PropTypes.func.isRequired,
=======
  loadOptions: PropTypes.func.isRequired
>>>>>>> ae258bf581ec4570271430db7480cb0da134de51
};

export default DropdownComponent;
