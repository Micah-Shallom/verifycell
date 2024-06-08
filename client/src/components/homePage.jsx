import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, 
  Card, CardContent, CardHeader, CssBaseline, Box, ThemeProvider, useTheme 
} from '@mui/material';
import { Phone, DarkModeRounded } from '@mui/icons-material';
import { themes, useThemeMode } from '../theme';

export default function HomePage() {
  // Retrieve theme mode and toggle function from custom hook
  const { mode, toggleThemeMode } = useThemeMode(localStorage.getItem('themeMode'));

  return (
    <ThemeProvider theme={themes[mode]}>
      <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />
        {/* AppBar for navigation */}
        <AppBar position="static">
          <Toolbar>
            {/* Logo/icon and site title */}
            <IconButton edge="start" color="inherit" aria-label="menu" component={RouterLink} to="/">
              <Phone />
              <span style={{ display: 'none' }}>VerifyCell</span>
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />
            {/* Navigation links */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* Button to toggle dark mode */}
              <Button color="inherit" onClick={toggleThemeMode}><DarkModeRounded/></Button>
              {/* External links */}
              <Button color="inherit" component={RouterLink} to="https://github.com/Micah-Shallom/verifycell">About</Button>
              <Button color="inherit" component={RouterLink} to="https://www.linkedin.com/in/micah-shallom/">Contact</Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Box style={{ flex: 1 }}>
          {/* Main content section */}
          <Box style={{ width: '100%', padding: '3rem 0', textAlign: 'center' }}>
            <Container>
              {/* Main heading */}
              <Typography variant="h2" component="h1" gutterBottom>
                VerifyCell
              </Typography>
              {/* Description */}
              <Typography variant="body1" color="textSecondary">
                Securely verify your phone number and access personalized information.
              </Typography>
              <Box mt={4}>
                {/* Buttons for login and register */}
                <Button variant="contained" color="secondary" component={RouterLink} to="/login">
                  Login
                </Button>
                <Button variant="outlined" color="secondary" component={RouterLink} to="/register" sx={{ ml: 2 }}>
                  Register
                </Button>
              </Box>
            </Container>
          </Box>
          {/* Features section */}
          <Box sx={{ width: '100%', padding: '3rem 0', 
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.primary.grey : t.palette.primary.main,
            textAlign: 'center' }}>
            <Container>
              {/* Section heading */}
              <Typography variant="h3" component="h2" gutterBottom>
                Features
              </Typography>
              {/* Description */}
              <Typography variant="body1" color="textSecondary">
                VerifyCell offers a range of features to help you manage your personal information securely.
              </Typography>
              {/* Grid for feature cards */}
              <Grid container spacing={4} mt={4}>
                <Grid item xs={12} sm={6} md={4}>
                  {/* Card 1: Secure Verification */}
                  <Card>
                    <CardHeader title="Secure Verification" />
                    <CardContent>
                      <Typography variant="body2">
                        Verify your phone number with our advanced security measures.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {/* Card 2: Personalized Information */}
                  <Card>
                    <CardHeader title="Personalized Information" />
                    <CardContent>
                      <Typography variant="body2">
                        Access your personal details, including name, address, and more.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {/* Card 3: Seamless Integration */}
                  <Card>
                    <CardHeader title="Seamless Integration" />
                    <CardContent>
                      <Typography variant="body2">
                        Integrate VerifyCell with your existing applications and services.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {/* Card 4: Privacy Protection */}
                  <Card>
                    <CardHeader title="Privacy Protection" />
                    <CardContent>
                      <Typography variant="body2">
                        Rest assured that your personal information is kept secure and private.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {/* Card 5: Customizable Settings */}
                  <Card>
                    <CardHeader title="Customizable Settings" />
                    <CardContent>
                      <Typography variant="body2">
                        Tailor VerifyCell to your specific needs with our flexible settings.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  {/* Card 6: Reliable Support */}
                  <Card>
                    <CardHeader title="Reliable Support" />
                    <CardContent>
                      <Typography variant="body2">
                        Our dedicated support team is here to assist you with any questions or concerns.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
        {/* Footer section */}
        <Box style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="body2" color="textSecondary">
            &copy; 2024 VerifyCell. All rights reserved.
          </Typography>
          <Box mt={2}>
            {/* Links to terms and privacy */}
            <Button color="inherit" component={RouterLink} to="#" size="small">
              Terms of Service
            </Button>
            <Button color="inherit" component={RouterLink} to="#" size="small" sx={{ ml: 2 }}>
              Privacy
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
