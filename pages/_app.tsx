import * as React from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { DefaultSeo } from 'next-seo';

import ConfirmationProvider from '~/utils/confirmation'
import FlagsProvider from '~/services/firebase-remote-config';
import Layout from '~/components/Layout'
import Snackbar from '~/config/snackbar'
import createEmotionCache from '~/utils/createEmotionCache';
import theme from '~/styles/theme';

import defaultConfigSeo from '../next-seo.config'

import '~/styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppPropsWithLayout {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => 
    <Layout>{page}</Layout>
  )

  let ComponentProvider = getLayout(<Component {...pageProps} />)

  ComponentProvider = (
    <ConfirmationProvider>
      <Snackbar>
        <FlagsProvider>
          <DefaultSeo {...defaultConfigSeo} />
          {ComponentProvider}
        </FlagsProvider>
      </Snackbar>
    </ConfirmationProvider>
  )

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {ComponentProvider}
      </ThemeProvider>
    </CacheProvider>
  );
}