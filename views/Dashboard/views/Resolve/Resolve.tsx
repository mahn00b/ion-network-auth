import { FormEvent, useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Snackbar,
    Slide
  } from "@mui/material";
import { resolveAddress } from "../../../../utils/ion";
import CopyText from '../../../../components/CopyText';
import 'react-json-pretty/themes/acai.css';

export default function Resolve() {
  const [did, setDID] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const uri = data.get('uri') as string;

    const response = await resolveAddress(uri);

    setDID(response);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit}>
      <Typography fontSize="1.5rem" align="center" sx={{ mb: '2rem'}}>Resolve DID Address</Typography>
      <Typography>Enter a DID address below:</Typography>
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
      <DecodedMessageDialog open={openDialog} did={did} onClose={closeDialog} />
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Resolve Address
      </Button>
    </Box>
  )
}

interface DecodedMessageDialogProps {
  open: boolean;
  did: string;
  onClose: () => void;
}

const DecodedMessageDialog = ({
  open,
  did,
  onClose
}: DecodedMessageDialogProps) => (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        <Typography fontSize="1.5rem" textAlign="center">Resolved Address</Typography>
      </DialogTitle>
      <DialogContent sx={{ p: '2rem'}}>
        <Box component="span" sx={{ position: 'relative' }}>
          <CopyText data={did} type="json" />
        </Box>
      </DialogContent>
    </Dialog>
);
