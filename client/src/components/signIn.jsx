import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import { themes, useThemeMode } from '../theme';
import Copyright from './copyright';
import { Formik, Form, Field }  from 'formik';
import * as Yup from 'yup';
import { useStatusContext } from '../context/displayContext';
import { useAuthContext } from '../context/authContext';
import StatusDisplay from './statusDisplay';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { useEffect } from 'react';

export default function SignIn() {
  // Retrieve necessary data from custom hooks
  const { user, isAuthenticated, login } = useAuthContext();
  const { message, setMessage, status, setStatus } = useStatusContext();
  const navigate = useNavigate();
  const { mode } = useThemeMode(localStorage.getItem('themeMode') || 'light');

  // Effect to redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      console.log(user);
      navigate(`/dashboard/${user.username}`, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  // Regular expressions for email and password validation
  const emailRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  // Initial values for form fields
  const initialValues = {
    email: '',
    password: '',
  };

  // Form validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter a valid email")
      .matches(emailRegExp, "Enter a valid email")
      .required("Required"),
    password: Yup.string()
      .min(4, "Minimum characters should be 8")
      .matches(passwordRegExp, "Password must have one upper, lower case, number, and special symbol")
      .required('Required'),
  });

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Send login request to server
      const response = await axiosInstance.post("/users/login", values);
      const { access_token, refresh_token, user } = response.data;

      // Login the user and set tokens
      login(access_token, user);
      document.cookie = `refreshToken=${refresh_token}; path=/; Secure; SameSite=Strict;`;

      // Set success message and redirect to dashboard
      setMessage("User logged in successfully");
      setStatus("success");
      setTimeout(() => {
        navigate(`/dashboard/${user.username}`, { replace: true });
      }, 3000);

    } catch (error) {
      // Handle different types of errors
      if (error.response) {
        console.error("Error response: ", error.response.data);
        setMessage(error.response.data.detail);
        setStatus("error");
      } else if (error.request) {
        console.error("Error request: ", error.request);
        setMessage("No response from server");
        setStatus("error");
      } else {
        console.error("Error message: ", error.message);
        setMessage(error.message);
        setStatus("error");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={themes[mode]}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* Background image */}
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Sign-in form container */}
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Sign-in icon */}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main'}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {/* Display status messages */}
            {status && <StatusDisplay status={status} message={message}/>}
            {/* Formik form for sign-in */}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              method="POST"
            >
              {({ errors, touched, isSubmitting }) => (
                <Box component={Form} noValidate>
                  {/* Email input field */}
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                  {/* Password input field */}
                  <Field
                    as={TextField}
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />
                  {/* Remember me checkbox */}
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                  {/* Submit error message */}
                  {errors.submit && (
                    <Typography color="error" variant="body2" align="center">
                      {errors.submit}
                    </Typography>
                  )}
                  {/* Sign-in button */}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting}
                  >
                    Sign In
                  </Button>
                  {/* Forgot password and sign-up links */}
                  <Grid container>
                    <Grid item xs>
                      <Link href="#" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  {/* Copyright information */}
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
