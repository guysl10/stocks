import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { message } from '../utils';

function UserLoginPageGuard() {
  const isUserLoggedIn = useSelector((state) => state.authState.isUserLoggedIn);
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push('/');
    }
  }, [isUserLoggedIn]);
  return (
    <></>
  );
}

export default UserLoginPageGuard;