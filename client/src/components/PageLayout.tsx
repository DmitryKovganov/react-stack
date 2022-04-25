import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const PageLayout = (props: any) => {
    return (
        <div className="App">
            <Navbar />
            <Outlet />
        </div>
    );
};
