import * as React from 'react';
import type { NextPage } from 'next';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSnackbar, VariantType } from 'notistack';
import { styled } from '@mui/system';

import Link from '~/components/Link';

const SnackbarContainer = styled('div')`
  display: flex;
  flex-direction: row;
`

const Home: NextPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const handleClickSnackbar = (variant: VariantType) => () => {
    enqueueSnackbar(`Show snackbar ${variant}`, {
      variant,
    })
  }
  const variants: VariantType[] = ['default', 'info', 'success', 'error', 'warning']

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
          MUI v5 + Next.js with TypeScript example (Home)
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <SnackbarContainer>
          {variants.map((variant) => (
            <Button key={variant} onClick={handleClickSnackbar(variant)}>
              {`Show snackbar ${variant}`}
            </Button>
          ))}
        </SnackbarContainer>
      </Box>
    </Container>
  );
};

export default Home;