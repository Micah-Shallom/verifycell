import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Avatar, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import TextField from "@mui/material/TextField";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Formik , Form, Field, ErrorMessage} from 'formik'
import * as Yup from 'yup'

const Login = ({handleChange}) => {

    const paperStyle={padding :20,height:'95vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor: "#00897B"}
    const bottomMargin = {margin: "8px 0"}
    const initialValues = {
        username: "",
        email: "",
        password: "",
        remember: false
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("username is required"),
        email: Yup.string().email("please enter valid email").required("email is required"),
        password: Yup.string().required("password is required")
    })


    const onSubmit = (values, props) => {
        console.log(values)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2500)
    }

    return (
        <Grid>
        <Paper elevation={10} style={paperStyle}>
            <Grid align="center">
            <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
            <h2>Sign In</h2>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {
                    (props) => (
                        <Form>
                            <Field as={TextField} label="Username" name="username" placeholder="Enter Username" fullWidth required helperText={<ErrorMessage name='username' />} />
                            <Field as={TextField} label="Email" name="email" placeholder="Enter Email" fullWidth required helperText={<ErrorMessage name='email' />} />
                            <Field as={TextField} label="Password" name="password" placeholder="Enter Password" type="password" fullWidth required helperText={<ErrorMessage name='password' />} />
                            <Field as={FormControlLabel} required 
                            control={<Checkbox name="remember" color='primary' />} 
                            label="Remember Me" />
                            <Button type="submit" fullWidth variant="contained" sx={{ backgroundColor: '#004D40', color: 'white' }} style={bottomMargin} disabled={props.isSubmitting}>{props.isSubmitting ? "Loading" : "Sign In"}</Button>
                        </Form>
                    )   
                }
            </Formik>
            </Grid>
            
            <Typography>
                <Link href="#">Forgot Password</Link>
            </Typography>
            <Typography>
                Do you have an account? 
                <Link href="#" onClick={() => handleChange('event', 1)}> Sign Up</Link>
            </Typography>
        </Paper>
        </Grid>
    );
}

export default Login