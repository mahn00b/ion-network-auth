import {
  Typography,
  Box,
  Snackbar,
  Slide
} from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import styles from './CopyText.module.scss';
import { useState } from 'react';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/acai.css';

interface CopyTextProps {
  data: string;
  type?: 'json' | 'default'
}

export default function CopyText({
  data = '',
  type = 'default'
}: CopyTextProps) {
  const [open, setOpen] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(data);
    setOpen(true)
  }

  const handleClose = () => setOpen(false);
  let view;
  switch (type) {
    case 'json':
      view =
      (
      <>
        <Box component="span" onClick={copy}>
          <ContentPasteIcon
            sx={{ position: 'absolute', right: '1rem', top: '1rem', color: 'white'}}
          />
        </Box>
        <JSONPretty json={data} mainStyle="padding:1rem;border-radius:4px"/>
      </>
    );
    break;
    default:
      view = (
        <Box
          className={styles.CopyText}
          onClick={copy}
        >
          <Typography className={styles.text}>{data}</Typography>
          <ContentPasteIcon />
        </Box>
      )
  }


  return (
    <>
    {view}
    <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center'}}
        open={open}
        onClose={handleClose}
        TransitionComponent={Slide}
        message="Copied!"
        key={Slide ? Slide.name : ''}
      />
    </>

  )
}
