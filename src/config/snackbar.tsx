import React from 'react'
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarProvider, SnackbarKey, SnackbarProviderProps } from 'notistack';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

type Props = {
  children: React.ReactElement
}
type SnackbarConfig = Omit<SnackbarProviderProps, 'children'>

const snackbarConfig: SnackbarConfig = {
  maxSnack: 3,
}

const useStyles: Function = makeStyles((props: Theme) => {
  return {
    success: {
      backgroundColor: `${props.palette.success.main} !important`,
    },
    error: {
      backgroundColor: `${props.palette.error.main} !important`,
    },
    info: {
      backgroundColor: `${props.palette.info.main} !important`,
    },
    warning: {
      backgroundColor: `${props.palette.warning.main} !importan`,
    }
  }
})

const Snackbar = ({
  children
}: Props) => {
  const classes = useStyles()
  const notistackRef = React.createRef<SnackbarProvider>();
  const onClickDismiss = (key: SnackbarKey) => () => { 
    notistackRef.current?.closeSnackbar(key);
  }
  console.log('classes', classes)
  return (
    <SnackbarProvider
      {...snackbarConfig}
      classes={{
        variantSuccess: classes.success,
        variantError: classes.error,
        variantWarning: classes.warning,
        variantInfo: classes.info,
    }}
      ref={notistackRef}
      action={(key) => (
        <Button onClick={onClickDismiss(key)} color="inherit">
          <CloseIcon />
        </Button>
      )}
    >
      {children}
    </SnackbarProvider>
  )
}

export default Snackbar