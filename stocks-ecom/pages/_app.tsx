import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { getStore } from '../redux/store';
import Layout from '../modules/layout/components/Layout/Layout';
import '../styles/global.scss';
import Notification from '../modules/shared/components/Notification/component/Notification/Notification';
import { setUtilStore } from '../modules/shared/utils';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins',
  },
  palette: {
    background: {
      default: 'white',
    },
    primary: {
      main: '#6D207C',
    },
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const mainContent = document.querySelector('.__main');
    mainContent.classList.remove('hidden');
  }, []);
  const store = getStore();
  setUtilStore(store);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <Notification />
        <div className="__main hidden">
          <Head>
            <title>Stocks</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <Layout>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </Layout>
        </div>
      </Provider>
    </ThemeProvider>
  );
}