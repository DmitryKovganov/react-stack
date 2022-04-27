
import Button from "@mui/material/Button";
import { ProfileData } from "./ProfileData";
import { useMsal } from "@azure/msal-react";
import store from '../../redux/store';
import { fetchProfile } from "./profileSlice";
import { useSelector } from "react-redux";

 export const ProfileContent = () => {
    const { instance, accounts } = useMsal();

    const requestProfile = () => store.dispatch(fetchProfile({ instance, accounts }));
    const profile = useSelector((state: any) => state.profile.data);
    
    function isEmpty(obj: any) {
        if (!obj) return true;
        return Object.keys(obj).length === 0;
    }

    if (!accounts.length) {
        return <></>;
    }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            {isEmpty(profile) ? 
                <Button variant="contained" color="inherit" onClick={requestProfile}>Request Profile Information</Button>
                :
                <ProfileData graphData={profile} />
            }
        </>
    );
};