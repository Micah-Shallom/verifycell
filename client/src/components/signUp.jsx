import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { themes, useThemeMode } from '../theme';
import Copyright from './copyright';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import StatusDisplay from './statusDisplay';
import { useStatusContext } from '../context';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const phoneRegExp = /^(\+234|0)[1-9]{1}[0-9]{9}$/;
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const navigate = useNavigate()

  const initialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
    otp: ''
  };

  const getValidationSchema = (step) => {
    switch (step) {
      case 1:
        return Yup.object().shape({
          firstname: Yup.string().min(3, "It's too short").required('Required'),
          lastname: Yup.string().min(3, "It's too short").required('Required'),
          username: Yup.string().min(3, "It's too short").required('Required'),
          email: Yup.string().email('Enter valid email').required('Required'),
          phone_number: Yup.string().matches(phoneRegExp, 'Enter valid Phone number').required('Required')
        });
      case 2:
        return Yup.object().shape({
          otp: Yup.string().required('OTP is required')
        });
      case 3:
        return Yup.object().shape({
          password: Yup.string()
            .min(8, 'Minimum characters should be 8')
            .matches(passwordRegExp, 'Password must have one upper, lower case, number, special symbol')
            .required('Required'),
          confirm_password: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords do not match')
            .required('Required')
        });
      default:
        return Yup.object().shape({});
    }
  };

  // const validationSchema = Yup.object().shape({
  //   firstname: Yup.string().min(3, "It's too short").required('Required'),
  //   lastname: Yup.string().min(3, "It's too short").required('Required'),
  //   username: Yup.string().min(3, "It's too short").required('Required'),
  //   email: Yup.string().email('Enter valid email').required('Required'),
  //   phone_number: Yup.string().matches(phoneRegExp, 'Enter valid Phone number').required('Required'),
  //   password: Yup.string()
  //     .min(8, 'Minimum characters should be 8')
  //     .matches(passwordRegExp, 'Password must have one upper, lower case, number, special symbol')
  //     .required('Required'),
  //   confirm_password: Yup.string()
  //     .oneOf([Yup.ref('password')], 'Passwords do not match')
  //     .required('Required'),
  //   otp: Yup.string().when('step', {
  //     is: 2, // Only validate OTP when on the verification step
  //     then: Yup.string().required('OTP is required')
  //   })
  // });

  const { 
    message, 
    setMessage, 
    status, 
    setStatus,
    verificationRef,
    setVerificationRef 
  } = useStatusContext();
  const [step, setStep] = useState(1);

  const {mode} = useThemeMode(localStorage.getItem('themeMode') || 'light');


  const handleSendOtp = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:8000/api/users/send-otp', {
        email: values.email,
        phone_number: values.phone_number,
        firstname: values.firstname,
        lastname: values.lastname,
        username: values.username
      });
      setMessage('OTP sent successfully.');
      setStatus('success');
      setVerificationRef(response.data.data.reference);
      setStep(2); // Proceed to the OTP verification step
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.detail);
        setStatus('error');
      } else if (error.request) {
        setMessage('No response from server');
        setStatus('error');
      } else {
        setMessage(error.message);
        setStatus('error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async (values, { setSubmitting }) => {
    try {
      console.log(verificationRef)
      const response = await axios.post('http://localhost:8000/api/users/verify-otp', {
        verification_reference: verificationRef,
        verification_code: values.otp
      });
      setMessage('OTP verified successfully.');
      setStatus('success');
	  console.log(response)
      setStep(3); // Proceed to the registration step
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.detail)
        setMessage("error.response.data.detail");
        setStatus('error');
      } else if (error.request) {
        setMessage('No response from server');
        setStatus('error');
      } else {
        setMessage(error.message);
        setStatus('error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    setSubmitting(false);
    

    try {
      const response = await axios.post('http://localhost:8000/api/users/register', values);
      setMessage('User registered successfully.');
      setStatus('success');
      console.log(response.data)
      setStep(1); // Reset to the initial step after successful registration
      resetForm();

      setTimeout(() => {
         navigate("/login")
      }, 2000)
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.detail);
        setStatus('error');
      } else if (error.request) {
        setMessage('No response from server');
        setStatus('error');
      } else {
        setMessage(error.message);
        setStatus('error');
      }
    }
  };

  return (
    <ThemeProvider theme={themes[mode]}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {status && <StatusDisplay status={status} message={message} />}
          <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema(step)}
            onSubmit={(values, actions) => {
              if (step === 1) {
                handleSendOtp(values, actions);
              } else if (step === 2) {
                handleVerifyOtp(values, actions);
              } else if (step === 3) {
                handleRegister(values, actions);
              }
            }}
          method="POST"
          >
            {({ errors, touched, isSubmitting }) => (
              <Box component={Form} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                {step === 1 && (
                  <Box noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Field
                          as={TextField}
                          name="firstname"
                          label="First Name"
                          fullWidth
                          error={errors.firstname && touched.firstname}
                          helperText={<ErrorMessage name="firstname" />}
                          required
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Field
                          as={TextField}
                          name="lastname"
                          label="Last Name"
                          fullWidth
                          error={errors.lastname && touched.lastname}
                          helperText={<ErrorMessage name="lastname" />}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="username"
                          label="Username"
                          fullWidth
                          error={errors.username && touched.username}
                          helperText={<ErrorMessage name="username" />}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="email"
                          label="Email Address"
                          fullWidth
                          error={errors.email && touched.email}
                          helperText={<ErrorMessage name="email" />}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="phone_number"
                          label="Phone Number"
                          fullWidth
                          error={errors.phone_number && touched.phone_number}
                          helperText={<ErrorMessage name="phone_number" />}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          disabled={isSubmitting}
                        >
                          Send OTP
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}
                {step === 2 && (
                  <Box noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="otp"
                          label="Enter OTP"
                          fullWidth
                          error={errors.otp && touched.otp}
                          helperText={<ErrorMessage name="otp" />}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          disabled={isSubmitting}
                        >
                          Verify OTP
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}
                {step === 3 && (
                  <Box noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="password"
                          label="Password"
                          type="password"
                          fullWidth
                          error={errors.password && touched.password}
                          helperText={<ErrorMessage name="password" />}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          as={TextField}
                          name="confirm_password"
                          label="Confirm Password"
                          type="password"
                          fullWidth
                          error={errors.confirm_password && touched.confirm_password}
                          helperText={<ErrorMessage name="confirm_password" />}
                          required
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          disabled={isSubmitting}
                        >
                          Register
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                )}
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
