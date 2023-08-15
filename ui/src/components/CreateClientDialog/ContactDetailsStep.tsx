import React, { useCallback, useContext } from 'react';
import { Form, Formik } from 'formik';
import { Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { CreateClientContext } from '.';
import * as yup from 'yup';
import CreateClientBackButton from './BackButton';
import CreateClientSteps from './Steps';
import { PatternFormat } from 'react-number-format';
import { phoneNumberFormat } from '../../constants/strings';

const validationSchema = yup.object({
	phoneNumber: yup
		.string()
		.required("Please enter the client's phone number.")
		.length(10, 'Please enter a valid phone number.'),
	email: yup.string().email().required("Please enter the client's email."),
});

const ContactDetailsStep: React.FunctionComponent = () => {
	const { handleNext, values } = useContext(CreateClientContext);

	const initialValues = {
		phoneNumber: values.phoneNumber,
		email: values.email,
	};

	const onSubmit = useCallback(
		(formValues: typeof initialValues) => {
			handleNext(formValues);
		},
		[handleNext]
	);

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			{({ handleChange, errors, values, setFieldValue }) => {
				return (
					<Form>
						<DialogContent>
							<CreateClientSteps />
							<TextField
								value={values.email}
								onChange={handleChange('email')}
								label='Email'
								fullWidth
								error={Boolean(errors.email)}
								helperText={errors.email}
								autoFocus
							/>
							<PatternFormat
								customInput={TextField}
								fullWidth
								label='Phone number'
								InputLabelProps={{
									shrink: true,
								}}
								onValueChange={(val) => {
									setFieldValue('phoneNumber', val.value, true);
								}}
								format={phoneNumberFormat}
								mask='_'
								valueIsNumericString
								allowEmptyFormatting
								error={Boolean(errors.phoneNumber)}
								helperText={errors.phoneNumber}
								value={values.phoneNumber}
							/>
						</DialogContent>
						<DialogActions sx={{ justifyContent: 'space-between' }}>
							<CreateClientBackButton />
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

export default ContactDetailsStep;
