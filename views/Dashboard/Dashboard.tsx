import {
  Container,
  Box,
  Typography,
  Button,
  ButtonGroup,
  TextField
} from '@mui/material'
import Sign from './views/Sign';
import styles from './Dashboard.module.scss';

interface DashboardProps {
  session: UserData;
}

export default function Dashboard() {
  return (
    <Container className={styles.Dashboard}>
      <Box className={styles.actions}>
        <Box className={styles.buttonHeader}>
          <ButtonGroup>
            <Button>Sign</Button>
            <Button>Verify</Button>
            <Button>Resolve</Button>
          </ButtonGroup>
        </Box>
        <Box className={styles.view}>
          <Sign />
        </Box>
      </Box>
    </Container>
  )
}
