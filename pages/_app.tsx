import * as React from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import Script from 'next/script'
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import { DefaultSeo } from 'next-seo';
import { appWithTranslation } from 'next-i18next';

import ConfirmationProvider from '~/utils/confirmation'
import FlagsProvider from '~/services/firebase-remote-config';
import Layout from '~/components/Layout'
import Snackbar from '~/config/snackbar'
import createEmotionCache from '~/utils/createEmotionCache';
import theme from '~/styles/theme';
import { GTM_ID } from '~/services/analytics';

import defaultConfigSeo from '../next-seo.config'

import '~/styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppPropsWithLayout {
  emotionCache?: EmotionCache;
}

export default appWithTranslation((props: MyAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => 
    <Layout>{page}</Layout>
  )

  let ComponentProvider = getLayout(<Component {...pageProps} />)

  ComponentProvider = (
    <ConfirmationProvider>
      <Snackbar>
        <FlagsProvider>
          {/* Google Tag Manager - Global base code */}
          <Script
            id="gtag-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer', '${GTM_ID}');
              `,
            }}
          />
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
})