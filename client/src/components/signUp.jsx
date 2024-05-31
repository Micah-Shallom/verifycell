import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import {defaultTheme} from '../theme';
import Copyright from './copyright';
import axios from 'axios';
import * as Yup from 'yup'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import {  useState } from 'react';
import StatusDisplay from './statusDisplay';

export default function SignUp() {
  const phoneRegExp =/^(\+234|0)[1-9]{1}[0-9]{9}$/
  const passwordRegExp =/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const initialValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password:''
  }
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().min(3, "It's too short").required("Required"),
    lastname: Yup.string().min(3, "It's too short").required("Required"),
    username: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    phone_number:Yup.string().matches(phoneRegExp,"Enter valid Phone number").required("Required"),
    password: Yup.string().min(8, "Minimum characters should be 8")
    .matches(passwordRegExp,"Password must have one upper, lower case, number, special symbol").required('Required'),
    confirm_password:Yup.string().oneOf([Yup.ref('password')],"Password not matches").required('Required')
  })

  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);
  

  const handleSubmit = async (values, { setSubmitting , resetForm}) => {

    setSubmitting(false);

	try {
		const response = await axios.post("http://localhost:8000/api/users/register", values)
		console.log("user registered successfully")
		console.log(response.data)
		setMessage("User Registered Successfully")
		setStatus("success")
	} catch (error) {
		if (error.response){
			//the request was made and the server repsonded with a service code
			console.error("Error response: ", error.response.data);
			setMessage(error.response.data.detail);
			setStatus("error")
		}else if (error.request){
			//The request was made but no response was received
			console.error("Error request: ", error.request);
			setMessage("No response from server")
			setStatus("error")
		}else {
			//something happened in setting up the request
			console.error("Error message: ", error.message)
			setMessage(error.message)
			setStatus("error")
		}
	}


  

	setTimeout(() => {
		if (status === "success"){
			resetForm();
		}
	}, 2000)

	resetForm();
	
};

// useEffect(() => {
//   //clear the message after 2 seconds
//   if (status === "success"){
//     setTimeout(() => {
//       setMessage(null);
//       setStatus(null);
//     }, 2000);
//   }
// }, [status, resetForm]);


  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

		  {status && <StatusDisplay status={status} message={message}/>}

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} method="POST">
            {({ errors, touched, isSubmitting }) => (
              <Box component={Form} noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field as={TextField} name='firstname' label='First Name' fullWidth
                      error={errors.firstname && touched.firstname}
                      helperText={<ErrorMessage name='firstname' />} required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field as={TextField} name='lastname' label='Last Name' fullWidth
                      error={errors.lastname && touched.lastname}
                      helperText={<ErrorMessage name='lastname' />} required />
                  </Grid>
                  <Grid item xs={12}>
                    <Field as={TextField} name='username' label='Username' fullWidth
                      error={errors.username && touched.username}
                      helperText={<ErrorMessage name='username' />} required />
                  </Grid>
                  <Grid item xs={12}>
                    <Field as={TextField} name='email' label='Email Address' fullWidth
                      error={errors.email && touched.email}
                      helperText={<ErrorMessage name='email' />} required />
                  </Grid>
                  <Grid item xs={12}>
                    <Field as={TextField} name='phone_number' label='Phone Number' fullWidth
                      error={errors.phone_number && touched.phone_number}
                      helperText={<ErrorMessage name='phone_number' />} required />
                  </Grid>
                  <Grid item xs={12}>
                    <Field as={TextField} name='password' label='Password' type='password' fullWidth
                      error={errors.password && touched.password}
                      helperText={<ErrorMessage name='password' />} required />
                  </Grid>
                  <Grid item xs={12}>
                    <Field as={TextField} name='confirm_password' label='Confirm Password' type='password' fullWidth
                      error={errors.confirm_password && touched.confirm_password}
                      helperText={<ErrorMessage name='confirm_password' />} required />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
				  <Grid item>
					<Link href="#" variant="body2">
					  Forgot Password?
					</Link>
				  </Grid>
				</Grid>
				{/* <Grid container justifyContent="center">
				  <Grid item>
					{error && <Alert severity="error">{error}</Alert>}
				  </Grid>
                </Grid> */}
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}