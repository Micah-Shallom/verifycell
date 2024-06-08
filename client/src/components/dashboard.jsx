import { useNavigate, useParams } from "react-router-dom";
import { Button, Avatar, Box, Typography, Card, CardContent, AppBar, Toolbar, CssBaseline, Container, Grid, ThemeProvider } from '@mui/material';
import { Logout, Delete, CalendarToday } from '@mui/icons-material';
import { themes, useThemeMode } from '../theme';
import { useAuthContext } from '../context/authContext';
import { useEffect, useState } from "react";
import { Loader } from "./loader";
import axiosInstance from "../axiosConfig";

export default function DashBoard() {
    // Hooks and context
    const { mode } = useThemeMode(localStorage.getItem('themeMode') || 'light'); // Get theme mode
    const { logout, user, setUser, isAuthenticated } = useAuthContext(); // Get authentication context
    const navigate = useNavigate(); // Navigate hook for routing
    const { username } = useParams(); // Get username from URL params
    const [loading, setLoading] = useState(true); // State for loading indicator

    // Effect to check authentication status and navigate if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    // Effect to fetch user data when username changes
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:8000/api/users/profile/${username}`);
                const data = response.data.user;
                setUser(data); // Set user data in context
            } catch (error) {
                console.error("Error fetching user data: ", error);
                navigate("/login"); // Navigate to login page on error
            } finally {
                setLoading(false); // Set loading to false after fetch completes
            }
        };

        if (username) {
            fetchUserData(); // Fetch user data if username exists
        }
    }, [username, setUser, navigate]);

    // Handle logout function
    const handleLogout = async () => {
        logout(); // Call logout function from context
        navigate("/"); // Navigate to home page after logout
    };

    // Render loading spinner while data is being fetched
    if (loading) {
        return <Loader />;
    }

    // Render error message if user data is not found
    if (!user) {
        return <Typography variant="h4" color="error">User not found</Typography>;
    }

    // Render user dashboard
    return (
        <ThemeProvider theme={themes[mode]}>
            <Box style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <CssBaseline />
                {/* App bar with title and logout button */}
                <AppBar position="static" style={{ backgroundColor: '#333' }}>
                    <Toolbar style={{ justifyContent: 'space-between' }}>
                        <Typography variant="h6" component="div">
                            Dashboard
                        </Typography>
                        <Button variant="contained" color="secondary" startIcon={<Logout />} onClick={handleLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                {/* Main content area */}
                <Box style={{ flex: 1, backgroundColor: '#f5f5f5', padding: '1.5rem' }}>
                    <Container maxWidth="sm">
                        {/* User profile card */}
                        <Card style={{ backgroundColor: '#333', color: '#fff' }}>
                            <CardContent>
                                {/* User avatar and basic info */}
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
                                {/* User details grid */}
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
                                {/* Edit profile button */}
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
