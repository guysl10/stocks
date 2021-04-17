import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FIELD_TYPES, Form, FormItems } from '../../shared/components/FormComponents';
import { IFieldProps } from '../../shared/components/FormComponents/FormItem';
import { signUpService } from '../shared/auth-service';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const signUpFields: Array<IFieldProps> = [
    {
      name: 'firstName', type: FIELD_TYPES.INPUT, required: true, label: 'First Name',
    },
    {
      name: 'lastName', type: FIELD_TYPES.INPUT, required: true, label: 'Last Name',
    },
    {
      name: 'email', type: FIELD_TYPES.EMAIL, required: true, label: 'Email',
    },
    {
      name: 'password', type: FIELD_TYPES.PASSWORD, required: true, label: 'Password',
    },
    {
      name: 'confirmPassword', type: FIELD_TYPES.PASSWORD, required: true, label: 'Confirm Password',
    },
  ];

  const doSignUp = async (formValue) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    await signUpService(formValue, dispatch);
    setIsLoading(false);
  };

  return (
    <Form onSubmit={doSignUp}>
      <FormItems fields={signUpFields} />
      <Button type="submit" disabled={isLoading} variant="contained" color="primary">Sign Up</Button>
    </Form>
  );
}

export default Login;