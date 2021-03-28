import React, { useContext, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { get } from 'lodash';
import Label from './Label/Label';
import styles from './Form.module.scss';
import { FormContext } from './Form';
import { ISelectFieldProps } from './FormInputs/Select';

export interface IFieldProps {
  value?: string | number | Array<any>,
  name: string,
  type: string,
  label: string,
  required?: boolean,
  onChange?: (any)=>void,
  fieldProps?: ISelectFieldProps,
  validations?: any
}

interface IFormItemProps extends IFieldProps{
  children: React.ReactNode,
}

export default function FormItem({
                                   children, label, name, required, validations,
                                 }: IFormItemProps) {
  const { form } = useContext(FormContext);
  const fieldRef = useRef();
  const errorMessage = get(form, `errors.${name}.message`);
  const requiredMessage = `${label || name} is required.`;
  // @ts-ignore
  return (
    <div className={styles.formInput}>
      {label ? <Label text={label} required={required} /> : null}
      {
        React.Children.map(children, (child) => (
          <Controller
            render={({ value, onChange, onBlur }) => {
              // @ts-ignore
              const childProps: IFormItemProps = child.props;
              return (
                // @ts-ignore
                <child.type
                  // label={label}
                  // name={name}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  fieldRef={fieldRef}
                  // eslint-disable-next-line  react/jsx-props-no-spreading
                  {...childProps}
                  // {...otherParams}
                />
              );
            }}
            onFocus={() => {
              // @ts-ignore
              if (fieldRef && fieldRef.current && fieldRef.current.focus) {
                // @ts-ignore
                fieldRef.current.focus();
              }
            }}
            name={name}
            // @ts-ignore
            control={form.control}
            rules={{ required: required ? requiredMessage : undefined, ...(validations || {}) }}
          />
        ))
      }
      {
        errorMessage ? (
          <div className={styles.errorMessage}>
            {errorMessage}
          </div>
        ) : null
      }
    </div>
  );
}
