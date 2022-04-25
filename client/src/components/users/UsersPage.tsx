import { Outlet } from "react-router-dom";

export const UsersPage = () => {
    return (
        <>
            <div>Users Page</div>
            <Outlet />
        </>
    );
}