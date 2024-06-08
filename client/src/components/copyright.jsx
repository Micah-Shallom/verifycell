import { Typography, Link } from "@mui/material";

/**
 * Copyright component to display copyright information.
 * @param {object} props - Props for the component.
 * @returns {JSX.Element} - Rendered component with copyright information.
 */
export default function Copyright(props) {
    return (
        // Typography component to render text with specific styles.
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            {/* Link component for displaying a clickable link. */}
            <Link color="inherit" href="/">
                VerifyCell
            </Link>{' '}
            {/* Display the current year dynamically. */}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
