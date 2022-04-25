import { CustomTable, CustomTableSettings } from '../table/CustomTable';
import axios from 'axios';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { NewUserForm } from './NewUserForm';

const settings: CustomTableSettings = {
    columns: [
        { title: 'Name'}, 
        { title: 'Last Name', align: 'right'},
        { title: 'Role', align: 'right'}
    ],
    rows: [
        { modelKey: 'name', component: 'th', scope: 'row' }, 
        { modelKey: 'lastName', align: 'right'},
        { modelKey: 'role', align: 'right'}
    ]
}

export const UsersList = () => {
    const [needShowForm, setShowForm] = useState(false);
    const tableRef = useRef(null);
    
    const fetchUsers = () =>
        axios.get('/api/users', )
        .then((response) => response.data as Record<string, any>[])
        .catch((error) => {
            console.error(error);
            return [];
        });
    
    const createUser = (payload: any) =>
        axios.post('/api/user', payload)
        .then((response) => response.data as Record<string, any>)
        .then(refreshAction)
        .catch((error) => {
            console.error(error);
            return [];
        });

    const refreshAction = () => {
        (tableRef.current as any)?.refresh();
    };
    
    const navigate = useNavigate();    
    const handleCreateNew = () => {
        setShowForm(() => true);
        navigate("./new");
    }

    const handleCancelNew = () => {
        setShowForm(() => false);
        navigate("./");
    }

    return (
        <>
            <CustomTable ref={tableRef} getData={fetchUsers} settings={{...settings}} />
            { 
                needShowForm ?
                <NewUserForm onCancel={handleCancelNew} onSubmit={createUser}/> :
                <Button variant="contained" onClick={handleCreateNew}>Create new</Button>
            }
        </>
    );
}