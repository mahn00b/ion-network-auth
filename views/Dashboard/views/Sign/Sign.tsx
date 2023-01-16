import { FormEvent, useState } from 'react';
import { Box, Button, TextField, Typography, Dialog, DialogTitle, DialogContent } from "@mui/material";
import CopyText from '../../../../components/CopyText';
import { signMessage } from "../../../../utils/ion";

export default function Sign() {
  const [selection, setSelection] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const message = data.get('message') as string;
    const token = data.get('token') as string;

    const signedMessage = await signMessage(token, message);

    setSelection(signedMessage);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Typography fontSize="1.5rem" align="center">Sign a Message</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="message"
        label="Your Message"
        name="message"
        autoComplete="off"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="token"
        label="Signature Token"
        type="password"
        id="token"
        autoComplete="off"
      />
      <SignedMessageDialog open={openDialog} message={selection} onClose={closeDialog} />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign Message
      </Button>
    </Box>
  )
}

interface SignedMessageDialogProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

const SignedMessageDialog = ({
  open,
  message,
  onClose
}: SignedMessageDialogProps) => (
  <Dialog
    open={open}
    onClose={onClose}
  >
    <DialogTitle>
      <Typography>Your Signed Message</Typography>
    </DialogTitle>
    <DialogContent>
      <CopyText text={message} />
    </DialogContent>
  </Dialog>
)
