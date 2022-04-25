import { useMsal } from "@azure/msal-react";
import Button from "@mui/material/Button";

/**
 * Renders a sign-out button
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
        instance.logoutRedirect({
            postLogoutRedirectUri: "/",
        });
    }
    return (
        <Button variant="outlined" color="inherit" onClick={handleLogout}>Logout</Button>
    )
}