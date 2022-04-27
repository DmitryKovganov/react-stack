import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from 'yup';

const validationSchema = yup.object({
    name: yup.string().required('Name is requred'),
    lastName: yup.string().required('Last name is requred'),
    role: yup.string().required('Role is requred'),
  });

export const NewUserForm = (props: any) => {
    const { onCancel, onSubmit } = props;
    const handleSubmit = (newUser: any) => onSubmit(newUser);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const formik = useFormik({
        initialValues: { name: '', lastName: '', role: '' },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsSubmitted(true);
            return handleSubmit(values).then(() => setIsSubmitted(false));
        }
      });

    return (
        <>
            <div>New User Form</div>
            <form onSubmit={formik.handleSubmit}>
            <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <TextField
            fullWidth
            id="role"
            name="role"
            label="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            error={formik.touched.role && Boolean(formik.errors.role)}
            helperText={formik.touched.role && formik.errors.role}
            />

            <Button onClick={onCancel} disabled={isSubmitted} variant="contained" color="warning">Cancel</Button>
            <Button type="submit" variant="contained" color="success">Save</Button>
        </form>
        </>
    )
}