import React from 'react';
import VirtualizedSelect from 'react-virtualized-select';
import { AsyncCreatable } from 'react-select';

const DropdownComponent = ({ loadOptions, input, multi, creatable, ...props }) => {
  if (multi) {
    return (
      <VirtualizedSelect
        async
        clearable
        loadOptions={loadOptions}
        {...input}
        onChange={input.onChange}
        onBlur={() => input.onBlur([...input.value])}
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

export default DropdownComponent;
