import { FormEvent, useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Container,
  Typography,
  Backdrop,
  Alert
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Copyright from '../../components/Copyright';
import { signIn } from '../../data/api';

export default function SignIn() {
  const [error, setError] = useState(false);
  const [inFlight, setInFlight] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const token = data.get('token') as string;
    setInFlight(true);

    try {
      const isSignedIn = await signIn(email, token);

      if (isSignedIn) {
        router.push('/dashboard')
      }
    } catch {
      setInFlight(false);
      setError(true);
    }
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
            Sign in
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
            <TextField
              margin="normal"
              required
              fullWidth
              placeholder="Token"
              name="token"
              label="Token"
              type="password"
              id="token"
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <NextLink href="/register">
                  <Button>
                    {"Don't have an account? Sign Up"}
                  </Button>
                </NextLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Backdrop open={inFlight} />
        {error && <Alert variant="filled" severity="error">A server error occurred. Please check your credentials and try again.</Alert>}
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
}
