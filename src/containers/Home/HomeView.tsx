import * as React from 'react';
import type { NextPage } from 'next';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSnackbar, VariantType } from 'notistack';
import { styled } from '@mui/system';

import Dialog from '~/components/Dialog/DialogBasic'
import Link from '~/components/Link';
import { useConfirmation } from '~/utils/confirmation';

import RemoteConfig from './RemoteConfig'
import Todo from './Todo'

const SnackbarContainer = styled('div')`
  display: flex;
  flex-direction: row;
`

const Home: NextPage = () => {
  // Snackbar
  const { enqueueSnackbar } = useSnackbar()
  const handleClickSnackbar = (variant: VariantType) => () => {
    enqueueSnackbar(`Show snackbar ${variant}`, {
      variant,
    })
  }
  const variants: VariantType[] = ['default', 'info', 'success', 'error', 'warning']

  // Dialog
  const { openConfirmation } = useConfirmation()
  const [isDialogOpen, setIsDialogOpen] = React.useState(false)
  const handleClickConfirm = () => {
    openConfirmation({
      title: 'Title Confirmation',
      message: 'Are you sure?',
      onClose: () => {
        console.log('click close')
      },
      onSubmit: () => {
        console.log('click submit')
      },
      textButtonCancel: 'Tutup',
      textButtonConfirm: 'Kirim',
    })
  }
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
        <Button onClick={() => setIsDialogOpen(true)}>Dialog Basic</Button>
        <Button onClick={handleClickConfirm}>Imperative Dialog Confirm</Button>
        <RemoteConfig />
        <Todo />
      </Box>
      <Dialog
        maxWidth="md"
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Title dialog basic"
      >
        <Typography variant="body2">This is ialog basic</Typography>
      </Dialog>
    </Container>
  );
};

export default Home;