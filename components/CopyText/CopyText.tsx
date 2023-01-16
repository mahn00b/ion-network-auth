import {
  Typography,
  Box,
  Snackbar,
  Slide
} from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import styles from './CopyText.module.scss';
import { useState } from 'react';

interface CopyTextProps {
  text: string
}

export default function CopyText({
  text = ''
}: CopyTextProps) {
  const [open, setOpen] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setOpen(true)
  }

  const handleClose = () => setOpen(false);

  return (
    <Box
      className={styles.CopyText}
      onClick={copy}
    >
      <Typography className={styles.text}>{text}</Typography>
      <ContentPasteIcon className={styles.icon} />
      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={Slide}
        message="Copied!"
        key={Slide ? Slide.name : ''}
      />
    </Box>
  )
}
