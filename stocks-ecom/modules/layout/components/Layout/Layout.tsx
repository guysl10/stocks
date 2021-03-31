import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkLogin } from '../../../auth/shared/auth-service';
import Footer from './footer/Footer';
import Header from './Header/Header';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  const [checkLoginProgressState, setCheckLoginProgressState] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await checkLogin(dispatch);
      setCheckLoginProgressState(false);
    })();
  }, []);
  return !checkLoginProgressState ? (
    <div className={styles.layout}>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  ) : null;
}
