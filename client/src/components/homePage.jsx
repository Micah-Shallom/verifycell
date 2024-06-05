import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Container, Grid, Card, CardContent, CardHeader, CssBaseline, Box, ThemeProvider, useTheme } from '@mui/material';
import { Phone, DarkModeRounded } from '@mui/icons-material';
import { themes, useThemeMode } from '../theme';

export default function HomePage() {
  const {mode, toggleThemeMode} = useThemeMode(localStorage.getItem('themeMode'));

  return (
    <ThemeProvider theme={themes[mode]}>
    <Box style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" component={RouterLink} to="/">
            <Phone />
            <span style={{ display: 'none' }}>VerifyCell</span>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit"  onClick={toggleThemeMode}><DarkModeRounded/></Button>
            <Button color="inherit" component={RouterLink} to="#">About</Button>
            <Button color="inherit" component={RouterLink} to="#">Contact</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box style={{ flex: 1 }}>
        <Box style={{ width: '100%', padding: '3rem 0', textAlign: 'center' }}>
          <Container>
            <Typography variant="h2" component="h1" gutterBottom>
              VerifyCell
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Securely verify your phone number and access personalized information.
            </Typography>
            <Box mt={4}>
              <Button variant="contained" color="secondary" component={RouterLink} to="/login">
                Login
              </Button>
              <Button variant="outlined" color="secondary" component={RouterLink} to="/register" sx={{ ml: 2 }}>
                Register
              </Button>
            </Box>
          </Container>
        </Box>
        <Box sx={{ width: '100%', padding: '3rem 0', backgroundColor: "#f0f0f0" , textAlign: 'center' }}>
          <Container>
            <Typography variant="h3" component="h2" gutterBottom>
              Features
            </Typography>
            <Typography variant="body1" color="textSecondary">
              VerifyCell offers a range of features to help you manage your personal information securely.
            </Typography>
            <Grid container spacing={4} mt={4}>
              <Grid item xs={12} sm={6} md={4}>
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
      <Box style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid #e0e0e0' }}>
        <Typography variant="body2" color="textSecondary">
          &copy; 2024 VerifyCell. All rights reserved.
        </Typography>
        <Box mt={2}>
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
