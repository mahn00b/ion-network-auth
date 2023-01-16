import {
  Container,
  Box,
  Typography,
  Button,
  ButtonGroup,
  TextField
} from '@mui/material'
import CopyText from '../../components/CopyText';
import Sign from './views/Sign';
import Verify from './views/Verify';
import styles from './Dashboard.module.scss';

export interface DashboardProps {
  session: UserData;
}

export default function Dashboard({
  session: {
    DIDUri
  }
}: DashboardProps) {
  return (
    <Container className={styles.Dashboard}>
      <Box className={styles.address} maxWidth="30rem">
        <Typography>Your DID Address</Typography>
        <CopyText text={DIDUri} />
      </Box>
      <Box className={styles.actions}>
        <Box className={styles.buttonHeader}>
          <ButtonGroup>
            <Button>Sign</Button>
            <Button>Verify</Button>
            <Button>Resolve</Button>
          </ButtonGroup>
        </Box>
        <Box className={styles.view}>
          <Verify />
        </Box>
      </Box>
    </Container>
  )
}
