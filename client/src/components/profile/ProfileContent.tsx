
import { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../auth/authConfig";
import { callMsGraph } from "../../auth/graph";
import Button from "@mui/material/Button";
import { ProfileData } from "./ProfileData";

 export const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response) => {
            callMsGraph(response.accessToken).then(response => setGraphData(response));
        });
    }

    if (!accounts.length) {
        return <></>;
    }

    return (
        <>
            <h5 className="card-title">Welcome {accounts[0].name}</h5>
            {graphData ? 
                <ProfileData graphData={graphData} />
                :
                <Button variant="contained" color="inherit" onClick={RequestProfileData}>Request Profile Information</Button>
            }
        </>
    );
};