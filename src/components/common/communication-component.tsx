import { Alert, Snackbar } from "@mui/material";
import { useResponseContext } from "../../services/response-context-service";

export const CommunicationComponent = () => {
  const { response, setResponse } = useResponseContext();
  const { open, message, severity } = response;

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setResponse({ ...response, open: false });
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={severity === 'error' ? null : 6000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}
    >
      <Alert
        severity={severity}
        sx={{ width: '100%', whiteSpace: 'pre-line' }}
        onClose={handleClose}
      >
        {message.join('\n')}
      </Alert>
    </Snackbar>
  )
}