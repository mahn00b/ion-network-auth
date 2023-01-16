import { FormEvent, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Alert
  } from "@mui/material";
import { verifyMessage } from "../../../../utils/ion";

export default function Sign() {
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const signedMessage = data.get('message') as string;
    const uri = data.get('uri') as string;

    const isLegit = await verifyMessage(signedMessage, uri);
    const [, payload] = signedMessage.split('.')
    const decodedMessage = new TextDecoder().decode(Buffer.from(payload, 'base64'))

    setIsValid(isLegit);
    setMessage(decodedMessage);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Typography fontSize="1.5rem" align="center">Verify a Message</Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="message"
        label="Message Token"
        name="message"
        autoComplete="off"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="uri"
        label="DID URI"
        type="text"
        id="uri"
        autoComplete="off"
      />
      <DecodedMessageDialog open={openDialog} isValid={isValid} message={message} onClose={closeDialog} />
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

interface DecodedMessageDialogProps {
  open: boolean;
  message: string;
  isValid: boolean;
  onClose: () => void;
}

const DecodedMessageDialog = ({
  open,
  message,
  isValid,
  onClose
}: DecodedMessageDialogProps) => (
  <Dialog
    open={open}
    onClose={onClose}

  >
    <DialogTitle>
      <Typography fontSize="1.5rem" textAlign="center">Decoded & Verified Message</Typography>
    </DialogTitle>
    <DialogContent sx={{ padding: '2rem'}}>
      <Typography fontSize="1.2rem">The Decoded Message:</Typography>
      <Typography fontSize="2rem" sx={{ mt: '1rem' }}>{message}</Typography>
      <Alert
        variant="filled"
        severity={isValid ? 'success' : 'error'}
        sx={{ mt: '1rem'}}
      >
        {isValid ? 'Message is Valid' : 'Unverified Message' }
      </Alert>
    </DialogContent>
  </Dialog>
)
