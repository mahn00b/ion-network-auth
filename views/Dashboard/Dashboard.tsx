import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  ButtonGroup,
} from '@mui/material'
import { useRouter } from 'next/router';
import { signOut } from '../../data/api';
import CopyText from '../../components/CopyText';
import Sign from './views/Sign';
import Verify from './views/Verify';
import Resolve from './views/Resolve';
import styles from './Dashboard.module.scss';

export interface DashboardProps {
  session: UserData;
}

export default function Dashboard({
  session: {
    DIDUri
  }
}: DashboardProps) {
  type View = 'sign' | 'resolve' | 'verify'
  const [view, setView] = useState<View>('sign')
  const router = useRouter();

  let ui;

  switch (view) {
    case 'sign':
      ui = <Sign />
      break;
    case 'resolve':
      ui = <Resolve />
      break;
    case 'verify':
      ui = <Verify />
  }

  const onSignOut = async () => {
    await signOut();

    router.push('/');
  }

  return (
    <Container className={styles.Dashboard} sx={{ mt: '5rem'}}>
      <Button className={styles.signOut} onClick={onSignOut}>Sign out</Button>
      <Box className={styles.address} maxWidth="30rem">
        <Typography>Your DID Address</Typography>
        <CopyText data={DIDUri} />
      </Box>
      <Box className={styles.actions}>
        <Box className={styles.buttonHeader}>
          <ButtonGroup>
            {
              (['sign', 'resolve', 'verify'] as View[]).map(
                (action: View) => (
                <Button
                  key={action}
                  onClick={() => setView(action)}
                  variant={view === action ? 'contained' : undefined}>
                    {action}
                </Button>)
              )
            }
          </ButtonGroup>
        </Box>
        <Box className={styles.view}>
          {ui}
        </Box>
      </Box>
    </Container>
  )
}
