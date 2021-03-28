import { useFieldArray, useForm, UseFormMethods } from 'react-hook-form';
import React, { useEffect, useState } from 'react';

export const FormContext = React.createContext({ form: {} });

interface IFormProps {
  initialValues?: object,
  children: React.ReactNode,
  onSubmit?: (any)=>void,
  formRef?: any,
  form?: UseFormMethods,
  className?: string,
}

export default function Form({
                               initialValues, children, onSubmit, formRef, form, className,
                             }: IFormProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  if (!form) {
    // FIXME check the solution for this ASAP
    // eslint-disable-next-line no-param-reassign
    form = useForm();
  }
  const { handleSubmit } = form;

  if (formRef && !formRef.current) {
    // eslint-disable-next-line no-param-reassign
    formRef.current = form;
  }

  useEffect(() => {
    console.log(initialValues);
    if (!isInitialized) {
      form.reset(initialValues);
      setIsInitialized(true);
    }
  }, [initialValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className}>
      <FormContext.Provider value={{ form }}>
        {children}
      </FormContext.Provider>
    </form>
  );
}

Form.defaultProps = {
  form: undefined,
  className: undefined,
  formRef: undefined,
  onSubmit: () => {},
  initialValues: {},
};

Form.useForm = useForm;
Form.useFieldArray = useFieldArray;
