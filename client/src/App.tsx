import {
  Routes,
  Route,
} from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./auth/authConfig";
import { PageLayout } from "./components/PageLayout";
import { Home } from "./components/Home";
import { ProfileContent } from "./components/profile/ProfileContent";
import "./styles/App.css";
import { UsersPage } from "./components/users/UsersPage";
import { UsersList } from "./components/users/UsersList";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { NewUserForm } from "./components/users/NewUserForm";

/**
 * Initialize a PublicClientApplication instance which is provided to the MsalProvider component
 * We recommend initializing this outside of your root component to ensure it is not re-initialized on re-renders
 */
 const msalInstance = new PublicClientApplication(msalConfig);

export default function App() {
    return (
        <MsalProvider instance={msalInstance}>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route index element={<Home />} />
                    <Route path="profile" element={<ProtectedRoute>
                        <ProfileContent />
                    </ProtectedRoute>} />
                    <Route path="users" element={<ProtectedRoute>
                            <UsersPage />
                        </ProtectedRoute>}>
                        <Route path="" element={<UsersList />} >
                            <Route index element={<UsersList />} />
                            <Route path="new" element={<NewUserForm />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </MsalProvider>
    );
}
