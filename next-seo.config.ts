import type { DefaultSeoProps } from 'next-seo'

const defaultSeoConfig: DefaultSeoProps = {
  title: 'Home',
  titleTemplate: 'SiteName | %s',
  openGraph: {
    title: 'Site Name',
    type: 'website',
    locale: 'en_IE',
    site_name: 'SiteName',
  },
  twitter: {
    handle: '@robbycp',
    site: '@robbycp',
    cardType: 'summary_large_image',
  },
}

export default defaultSeoConfig
