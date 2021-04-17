import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { FIELD_TYPES, Form, FormItems } from '../../shared/components/FormComponents';
import { IFieldProps } from '../../shared/components/FormComponents/FormItem';
import { loginService } from '../shared/auth-service';

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const loginFields: Array<IFieldProps> = [
    {
      name: 'email', type: FIELD_TYPES.EMAIL, required: true, label: 'Email',
    },
    {
      name: 'password', type: FIELD_TYPES.PASSWORD, required: true, label: 'Password',
    },
  ];

  const doLogin = async (formValue) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    await loginService(formValue, dispatch);
    setIsLoading(false);
  };

  return (
    <Form onSubmit={doLogin}>
      <FormItems fields={loginFields} />
      <Button
        disabled={isLoading}
        type="submit"
        variant="contained"
        color="primary"
      >
        Login
      </Button>
    </Form>
  );
}

export default Login;