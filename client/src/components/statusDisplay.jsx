import { Alert, Grid } from "@mui/material";

const StatusDisplay = ({ status, message }) => {
  return (
    <Grid container justifyContent="center">
      <Grid item>
        {status && <Alert severity={status}>{message}</Alert>}
      </Grid>
    </Grid>
  );
};

export default StatusDisplay;