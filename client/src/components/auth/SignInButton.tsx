import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../auth/authConfig";
import Button from "@mui/material/Button";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginRedirect(loginRequest).catch(e => {
            console.log(e);
        });
    }
    return (
        <Button variant="outlined" color="inherit" onClick={handleLogin}>Signin</Button>
    )
}