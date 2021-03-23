import React, { ReactNode } from 'react';
import Feedback from './Feedback';
import Footer from './footer/Footer';
import Header from './Header/Header';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: ReactNode
}
export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Feedback />
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
