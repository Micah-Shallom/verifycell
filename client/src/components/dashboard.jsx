import { removeAccessToken } from "../tokenStorage";
import { useNavigate } from "react-router-dom";
import { Button, Avatar, Box, Typography, Card, CardContent, AppBar, Toolbar, CssBaseline, Container, Grid, ThemeProvider } from '@mui/material';
import { Logout, Delete, CalendarToday } from '@mui/icons-material';
import { themes, useThemeMode } from '../theme';
import { useStatusContext } from '../context/displayContext';


export default function DashBoard() {
    const {mode} = useThemeMode(localStorage.getItem('themeMode') || 'light');

    // const {user} = useStatusContext();

    const navigate = useNavigate();  

    const handleLogout = async () => {
        console.log("Logout");
        await removeAccessToken();
        navigate('/');
    };

    const user = {
        firstname: 'John',
        lastname: 'Doe',
        username: 'johndoe',
        email: 'micahshallom',
        phone: '123-456-7890',
    }

  return (
    <ThemeProvider theme={themes[mode]}>
    <Box style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <AppBar position="static" style={{ backgroundColor: '#333' }}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div">
            Dashboard
          </Typography>
          <Button variant="contained" color="secondary" startIcon={<Logout />} onClick={handleLogout} >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box style={{ flex: 1, backgroundColor: '#f5f5f5', padding: '1.5rem' }}>
        <Container maxWidth="sm">
          <Card style={{ backgroundColor: '#333', color: '#fff' }}>
            <CardContent>
              <Box display="flex" alignItems="center" marginBottom="1.5rem">
                <Avatar alt="User Avatar" src="/placeholder.svg" sx={{ width: 64, height: 64, marginRight: '1rem' }} />
                <Box>
                  <Typography variant="h6" component="div">
                    {user.firstname} {user.lastname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    @{user.username}
                  </Typography>
                  <Box display="flex" alignItems="center" color="textSecondary" fontSize="small">
                    <CalendarToday fontSize="small" />
                    <Typography variant="body2" style={{ marginLeft: '0.5rem' }}>
                      Joined on May 15, 2021
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    First Name
                  </Typography>
                  <Typography variant="body1">
                    {user.firstname}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Last Name
                  </Typography>
                  <Typography variant="body1">
                    {user.lastname}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Username
                  </Typography>
                  <Typography variant="body1">
                    {user.username}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {user.email}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">
                    {user.phone}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Location
                  </Typography>
                  <Typography variant="body1">
                    San Francisco, CA
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Occupation
                  </Typography>
                  <Typography variant="body1">
                    Software Engineer
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Bio
                  </Typography>
                  <Typography variant="body1">
                    I'm a passionate software engineer with a love for building innovative and user-friendly applications.
                  </Typography>
                </Grid>
              </Grid>
              <Box display="flex" justifyContent="flex-end" marginTop="1.5rem">
                <Button variant="outlined" color="secondary" startIcon={<Delete />} size="small">
                  Edit Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
    </ThemeProvider>
  );
}
