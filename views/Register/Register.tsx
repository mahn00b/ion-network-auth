import { useState, FormEvent} from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Link,
  Container,
  Typography,
  Backdrop,
  CircularProgress
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NextLink from 'next/link';
import Copyright from '../../components/Copyright';
import CredentialsDialog from '../../components/CredentialsDialog';
import { register } from '../../data/api'

export default function Register() {
  const [inFlight, setInFlight] = useState(false);
  const [creds, setCreds] = useState<UserCredsResponse | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get('email')?.toString()
    setInFlight(true)

    const response = await register(email as string);

    setCreds(response);
    setInFlight(false);
  };

  return (
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create a new DID
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <NextLink href="/signin">
                  <Button sx={{ textTransform: 'none' }}>
                    {"Already have an account? Sign in"}
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {inFlight &&
          <Backdrop
            open={true}
          >
            <CircularProgress />
          </Backdrop>}
        {!inFlight && creds && <CredentialsDialog DIDUri={creds.DIDUri} token={creds.token} />}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}
