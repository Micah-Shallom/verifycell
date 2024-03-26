import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Paper, Typography } from '@mui/material';
import Login from './login';
import SignUp from './signUp';

const SignInOutTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const paperStyle={width:340,margin:"20px auto", backgroundColor:"#004D40", color:"white"}

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    <Paper elevation={20} style={paperStyle}>
        <Tabs
          value={value}
          indicatorColor="white"
          textColor="white"
          style={{display:"flex", justifyContent:"space-between"}}
          onChange={handleChange}
          aria-label="disabled tabs example">
            <Tab label="Sign In" />
          
            <Tab label="Sign Up" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Login handleChange={handleChange}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SignUp/>
        </TabPanel>
    </Paper>
  );
}

export default SignInOutTabs