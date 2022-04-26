import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required(),
    lastName: yup.string().required(),
    role: yup.string().required(),
  });

const validateSchema = (data: any) => {
    const castData = schema.cast(data);
    return schema.isValid(castData)
        .then((valid) => valid)
        .catch((err: any) => err.errors);
}

export const NewUserForm = (props: any) => {
    const { onCancel, onSubmit } = props;
    const handleSubmit = (newUser: any) => onSubmit(newUser);

    return (
        <>
            <div>New User Form</div>
            <Formik
                initialValues={{ name: '', lastName: '', role: '' }}
                validate={values => validateSchema(values)}
                onSubmit={(values, { setSubmitting }) => {
                    handleSubmit(values).then(() => setSubmitting(false));
                }}
                >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="name" />
                        <ErrorMessage name="name" component="div" />
                        <Field type="text" name="lastName" />
                        <ErrorMessage name="lastName" component="div" />
                        <Field type="text" name="role" />
                        <ErrorMessage name="role" component="div" />

                        <Button onClick={onCancel} disabled={isSubmitting} variant="contained" color="warning">Cancel</Button>
                        <Button type="submit" variant="contained" color="success">Save</Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}