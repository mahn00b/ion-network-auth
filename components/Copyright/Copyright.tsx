import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Button color="inherit">
        ION Demo
      </Button>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
