import React, { useCallback, useContext } from 'react';
import { Form, Formik } from 'formik';
import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { CreateClientContext } from '.';
import * as yup from 'yup';
import CreateClientSteps from './Steps';

const validationSchema = yup.object({
	firstName: yup.string().required("Please enter the client's first name.").max(100),
	lastName: yup.string().required("Please enter the client's first name.").max(100),
});

const PersonalDetailsStep: React.FunctionComponent = () => {
	const { handleNext, values } = useContext(CreateClientContext);

	const initialValues = {
		firstName: values.firstName,
		lastName: values.lastName,
	};

	const onSubmit = useCallback(
		(formValues: typeof initialValues) => {
			handleNext(formValues);
		},
		[handleNext]
	);

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ handleChange, errors, values }) => {
				return (
					<Form>
						<DialogContent>
							<CreateClientSteps />
							<TextField
								value={values.firstName}
								onChange={handleChange('firstName')}
								label='First name'
								fullWidth
								error={Boolean(errors.firstName)}
								helperText={errors.firstName}
								autoFocus
							/>
							<TextField
								value={values.lastName}
								onChange={handleChange('lastName')}
								label='Last name'
								fullWidth
								error={Boolean(errors.lastName)}
								helperText={errors.lastName}
							/>
						</DialogContent>
						<DialogActions>
							<Button type='submit' variant='contained'>
								Next
							</Button>
						</DialogActions>
					</Form>
				);
			}}
		</Formik>
	);
};

export default PersonalDetailsStep;
