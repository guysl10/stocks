import React from 'react';
import Grid from '@material-ui/core/Grid';
import {
  Input, Password, Checkbox, TextArea, Select, TagInput, ImageInput,
} from './FormInputs';
import FormItem, { IFieldProps } from './FormItem';
import FIELD_TYPES from './FieldTypes';

const fieldMap = {
  [FIELD_TYPES.TEXT_AREA]: TextArea,
  [FIELD_TYPES.CHECKBOX]: Checkbox,
  [FIELD_TYPES.TAG_INPUT]: TagInput,
  [FIELD_TYPES.IMAGE_INPUT]: ImageInput,
  [FIELD_TYPES.INPUT]: Input,
  [FIELD_TYPES.PHONE]: Input,
  [FIELD_TYPES.EMAIL]: Input,
  [FIELD_TYPES.SELECT]: Select,
  [FIELD_TYPES.PASSWORD]: Password,
};

export const FieldItem = (fieldProp: IFieldProps) => {
  const Component = fieldMap[fieldProp.type];
  const formItemProps: IFieldProps = { ...fieldProp };
  if (fieldProp.type === FIELD_TYPES.CHECKBOX) {
    delete formItemProps.label;
  } else if (fieldProp.type === FIELD_TYPES.EMAIL) {
    formItemProps.validations = {
      ...formItemProps.validations,
      validate: (value) => {
        if (
          value
          && !value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
        ) {
          return 'Invalid email address.';
        }
        // no message
      },
    };
  } else if (fieldProp.type === FIELD_TYPES.PHONE) {
    formItemProps.validations = {
      ...formItemProps.validations,
      validate: (value) => {
        if (
          value
          && !value.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
        ) {
          return 'Invalid phone number';
        }
        // no message
      },
    };
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormItem {...formItemProps}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...formItemProps} />
    </FormItem>
  );
};

export const FormItems = ({ fields }: {fields: Array<IFieldProps>}) => (
  <Grid container>
    {fields.map((fieldProp) => (
      <Grid
        item
        key={fieldProp.name}
        xs={12}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <FieldItem {...fieldProp} />
      </Grid>
    ))}
  </Grid>
);
