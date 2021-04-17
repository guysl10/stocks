import React from 'react';
import Input from '../Input/Input';

export default function Password(props) {
  // eslint-disable-next-line react/jsx-props-no-spreading
   return <Input {...props} type="password" />;
}
