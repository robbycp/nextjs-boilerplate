import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import type { GetStaticProps } from 'next';

import Link from '../../components/Link';

const About: NextPageWithLayout = () => {
  const router = useRouter()
  const { t } = useTranslation('common');
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          MUI v5 + Next.js with TypeScript example About with custom layout
        </Typography>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('h1')}
        </Typography>
        <Link href="/about" locale="id">
          {t('change-locale')} indonesia
        </Link>
        <Link href="/about" locale="en">
          {t('change-locale')} english
        </Link>
        <Box maxWidth="sm">
          <Button variant="contained" component={Link} noLinkStyle href="/">
            {t('to-home')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'id', ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default About;

About.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <div>
      {page}
    </div>
  )
}