import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import { useState } from 'react';

export default function AlertUser(props: {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}) {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
      TransitionComponent={Fade}
    >
      <Alert severity={props.severity}>{props.message}</Alert>
    </Snackbar>
  );
}
