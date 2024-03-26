import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {FormHelperText} from "@mui/material";

const SignUp = () => {
    const paperStyle = { padding: 20,height:'95vh', width: 300, margin: "0 auto" }
    const headerStyle = {margin:0}
    const marginBottom = {marginBottom: 0}
    const initialValues = {
        name: '',
        email: '',
        gender: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        gender: Yup.string().oneOf(["male", "female", "other"], "Required").required("Required"),
        phoneNumber: Yup.number().typeError("Enter valid Phone Number").required('Required'),
        password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
    })

    const onSubmit = (values, props) => {
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2500)
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar>
                        <AddCircleOutlineIcon></AddCircleOutlineIcon>
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography variant="caption" gutterBottom >Please fill this form to create an account</Typography>
                </Grid>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form>
                                <Field as={TextField} fullWidth label="Name" name="name" style={marginBottom} placeholder="Enter your name" helperText={<ErrorMessage name="name" />} />
                                <Field as={TextField} fullWidth label="Email" style={marginBottom} name="email" placeholder="Enter your Email" helperText={<ErrorMessage name="email" />}/>
                                <FormControl style={marginBottom}>
                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                    <Field as={RadioGroup}
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="gender"
                                        style={{display:"initial"}}>
                                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </Field>
                                </FormControl>
                                <FormHelperText><ErrorMessage name="gender"/></FormHelperText>
                                <Field as={TextField} fullWidth label="Phone" name="phoneNumber" style={marginBottom} placeholder="Enter PhoneNumber" helperText={<ErrorMessage name="phoneNumber" />} />
                                <Field as={TextField} fullWidth label="Password" type="number" style={marginBottom} name="password" placeholder="Enter Password" helperText={<ErrorMessage name="password" />} />
                                <Field as={TextField} fullWidth label="Confirm Password" style={marginBottom} name="confirmPassword" helperText={<ErrorMessage name="confirmPassword" />} />
                                <Button type="submit" fullWidth color="primary" variant="contained" disabled={props.isSubmitting}>{props.isSubmitting ? "Loading" : "Sign Up"}</Button>
                            </Form>
                        )
                    }
                </Formik>
                
            </Paper>
        </Grid>
    )
}

export default SignUp