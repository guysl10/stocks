import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import styles from './Header.module.scss';
import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import { IHeaderItem } from './header.type';
import LoginRegisterDialog from '../../../../auth/components/LoginRegisterDialog';
import { updateLoginRegisterDialogState } from '../redux/layout.action';
import { logoutService } from '../../../../auth/shared/auth-service';

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.authState.isUserLoggedIn);

  const logout = async () => {
    await logoutService(dispatch);
  };

  const openLoginPopup = () => {
    dispatch(updateLoginRegisterDialogState(true));
  };

  const gotoCart = () => {
    if (!isUserLoggedIn) {
      return dispatch(updateLoginRegisterDialogState(true));
    }
    router.push('/cart');
  };

  const initialHeaderMenus: Array<IHeaderItem> = [
    {
      title: 'Logout', onClick: logout, display: !isUserLoggedIn, icon: <ExitToAppOutlinedIcon />,
    },
    {
      title: 'Login / Sign Up', onClick: openLoginPopup, display: isUserLoggedIn, icon: <AccountCircleOutlinedIcon />,
    },
    {
      title: 'Cart', onClick: gotoCart, display: true, icon: <ShoppingCartOutlinedIcon />,
    },
  ];

  const [headerMenu, setHeaderMenu] = useState([...initialHeaderMenus]);

  useEffect(() => {
    const newHeaderMenus = [...initialHeaderMenus];
    const logoutLink = newHeaderMenus.find((record) => record.title === 'Logout');
    const loginLink = newHeaderMenus.find((record) => record.title === 'Login / Sign Up');
    if (!isUserLoggedIn) {
      loginLink.display = true;
      logoutLink.display = false;
    } else {
      logoutLink.display = true;
      loginLink.display = false;
    }
    setHeaderMenu(newHeaderMenus);
  }, [isUserLoggedIn]);

  return (
    <div className={styles.header}>
      <LoginRegisterDialog />
      <DesktopHeader headerMenu={headerMenu} />
      <MobileHeader headerMenu={headerMenu} />
    </div>
  );
}
