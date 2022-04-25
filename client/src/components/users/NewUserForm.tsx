import { Button } from "@mui/material";

export const NewUserForm = (props: any) => {
    const { onCancel, onSubmit } = props;
    const handleSubmit = () => {
        const newUser = { name: Date.now().toString(), lastName: 'new', role: 'new' };
        onSubmit(newUser);
    };

    return (
        <>
            <div>New User Form</div>
            <Button variant="contained" color="warning" onClick={onCancel}>Cancel</Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>Save</Button>
        </>
    )
}