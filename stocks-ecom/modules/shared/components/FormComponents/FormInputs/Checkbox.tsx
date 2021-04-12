import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiCheckbox from '@material-ui/core/Checkbox';
import React from 'react';

// eslint-disable-next-line
export default function Checkbox({ value, onChange, label, ...props }) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked || false);
  };

  return (
    <FormControlLabel
        // eslint-disable-next-line
      value={value}
      // eslint-disable-next-line react/jsx-props-no-spreading
      control={<MuiCheckbox color="primary" onChange={handleChange} {...props} />}
      // eslint-disable-next-line
      label={label}
      labelPlacement="end"
    />
  );
}
