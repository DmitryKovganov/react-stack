import { useIsAuthenticated } from "@azure/msal-react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { SignInButton } from "./auth/SignInButton";
import { SignOutButton } from "./auth/SignOutButton";

export const Navbar = () => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div">
                    <Link to="/">Home</Link>
                </Typography>
                { isAuthenticated ? (
                    <>
                        <Typography variant="h6" color="inherit" component="div">
                            <Link to="/profile">Profile</Link>
                        </Typography>
                        <Typography variant="h6" color="inherit" component="div">
                            <Link to="/users">Users</Link>
                        </Typography>
                    </>
                ) : null }
                <Box display='flex' marginLeft={'auto'}>
                { isAuthenticated ? <SignOutButton /> : <SignInButton /> }
                </Box>
            </Toolbar>
        </AppBar>
    )
}