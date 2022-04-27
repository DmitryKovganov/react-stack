import { CustomTable, CustomTableSettings } from '../table/CustomTable';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { NewUserForm } from './NewUserForm';

import { fetchUsers, saveNewUser } from './usersSlice';
import store from '../../redux/store';
import { useSelector } from 'react-redux';

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
    
    const users = useSelector((state: any) => state.users.entities);
    console.log(users);

    const getData = () => store.dispatch(fetchUsers());

    const createUser = (user: any) => store.dispatch(saveNewUser(user))
        .then(refreshAction);

    const refreshAction = () => {
        returnToList();
        (tableRef.current as any)?.refresh();
    };
    
    const navigate = useNavigate();    
    const handleCreateNew = () => {
        setShowForm(true);
        navigate("./new");
    }

    const returnToList = () => {
        setShowForm(false);
        navigate("./");
    }

    const handleCancelNew = () => {
        returnToList();
    }

    return (
        <>
            <CustomTable ref={tableRef} getData={getData} settings={{...settings}} />
            { 
                needShowForm ?
                <NewUserForm onCancel={handleCancelNew} onSubmit={createUser}/> :
                <Button variant="contained" onClick={handleCreateNew}>Create new</Button>
            }
        </>
    );
}