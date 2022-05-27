import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export const AlertDialog = ({
  open,
  title,
  text,
  onClose,
  onAgree,
  onDisagree,
  agreeText = 'はい',
  disagreeText = 'いいえ',
}) => {
  const disagreeButton = onDisagree ? (
    <Button onClick={() => onDisagree()}>{disagreeText}</Button>
  ) : null;

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {disagreeButton}
          <Button onClick={() => onAgree()} autoFocus>
            {agreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
