import * as React from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { DialogActions } from '@mui/material';

export interface DialogProps {
  actions?: {
    onClick: () => void,
    text: string,
    buttonVariant: React.ComponentProps<typeof Button>['variant'],
    buttonColor: React.ComponentProps<typeof Button>['color'],
  }[],
  children: React.ReactNode,
  isOpen: boolean,
  maxWidth?: React.ComponentProps<typeof Dialog>['maxWidth']
  onClose: () => void,
  onClickCancel?: () => void,
  onClickSubmit?: () => void,
  textButtonCancel?: string,
  textButtonSubmit?: string,
  title?: string,
}
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const StyledDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function DialogCustom({
  actions,
  children,
  isOpen,
  maxWidth = "md",
  onClose,
  onClickCancel,
  onClickSubmit,
  textButtonCancel,
  textButtonSubmit,
  title,
}: DialogProps) {
  const handleClickCancel = () => {
    onClose()
    onClickCancel?.()
  }
  return (
    <StyledDialog
      fullWidth
      maxWidth={maxWidth}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {!!title && (
        <StyledDialogTitle id="alert-dialog-title" onClose={onClose}>
          {title}
        </StyledDialogTitle>
      )}
      <DialogContent>
        {children}
      </DialogContent>
      {actions ? (
        <DialogActions>
          {actions.map(({ onClick, text, buttonVariant, buttonColor }) => (
            <Button key={text} onClick={onClick} variant={buttonVariant} color={buttonColor}>{text}</Button>
          ))}
        </DialogActions>
      ) : (
        <>
          {(!!textButtonCancel || !!textButtonSubmit) && (
            <DialogActions>
              {!!textButtonCancel && (
                <Button color="error" onClick={handleClickCancel}>{textButtonCancel}</Button>
              )}
              {!!onClickSubmit && (
                <Button variant="contained" color="success" onClick={onClickSubmit}>{textButtonSubmit}</Button>
              )}
            </DialogActions>
          )}
        </>
      )}
    </StyledDialog>
  );
}
