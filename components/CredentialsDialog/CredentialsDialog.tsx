import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  DialogActions,
  Typography,
  Button
} from '@mui/material';
import dynamic from 'next/dynamic'
import Link from 'next/link';

interface CredentialsDialogProps {
  token: string;
  DIDUri: string;
}

export default function CredentialsDialog({
  DIDUri,
  token
 }: CredentialsDialogProps) {

  const DynamicCopyText = dynamic(() => import('../CopyText'), { ssr: false })

  return (
    <Dialog
      open={true}
    >
      <DialogTitle>Congratulations on your new DID!</DialogTitle>
      <DialogContent>
        <Box>
          <Box>
            <Typography>
              This is your DID address. (You can see this later)
            </Typography>
            <DynamicCopyText data={DIDUri} />
          </Box>
          <Box sx={{ marginTop: '1rem' }}>
            <Typography sx={{ marginBottom: '.5rem' }}>
              Below you&apos;ll find your Signature token. You use this token to Sign in to our app.
            </Typography>
            <Typography sx={{ marginBottom: '1rem' }}>
              This is the last time we&apos;ll show you your token. For your saftey, we don&apos;t store your
              token. Think of it like your password.
            </Typography>
            <DynamicCopyText data={token} />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-start", padding: "1rem"}}>
        <Link href="/dashboard">
          <Button
            variant="contained"
          >
            Go to your Dashboard
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  )

}
