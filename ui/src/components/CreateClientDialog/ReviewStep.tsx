import { Alert, Button, CircularProgress, DialogActions, DialogContent, Stack, Typography } from '@mui/material';
import CreateClientSteps from './Steps';
import CreateClientBackButton from './BackButton';
import { useCallback, useContext } from 'react';
import { CreateClientContext } from '.';
import { phoneNumberFormat } from './ContactDetailsStep';
import { patternFormatter } from 'react-number-format';
import { createClient } from '../../services/api';
import { queryClient } from '../../App';

const ReviewStep: React.FunctionComponent = () => {
	const { values, status, setStatus } = useContext(CreateClientContext);
	const isSubmitting = status === 'submitting';

	const submit = useCallback(async () => {
		try {
			setStatus('submitting');

			await createClient({
				id: Math.random().toString(32).substring(2),
				...values,
			});

			queryClient.invalidateQueries(['listClients']);

			setStatus('success');
		} catch (error) {
			console.log(error);
			setStatus('error');
		}
	}, [values, setStatus]);

	return (
		<>
			<DialogContent>
				<CreateClientSteps />
				<Stack>
					{status === 'error' && (
						<Alert severity='error' sx={{ marginTop: 1, marginBottom: 1 }}>
							An error occurred. Please try again.
						</Alert>
					)}
					<Typography variant='caption'>Full name</Typography>
					<Typography>{values.firstName}</Typography>
					<Typography variant='caption'>Last name</Typography>
					<Typography>{values.lastName}</Typography>
					<Typography variant='caption'>Email</Typography>
					<Typography>{values.email}</Typography>
					<Typography variant='caption'>Phone number</Typography>
					<Typography>
						{patternFormatter(values.phoneNumber, {
							format: phoneNumberFormat,
						})}
					</Typography>
				</Stack>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'space-between' }}>
				<CreateClientBackButton disabled={isSubmitting} />
				<Button
					variant='contained'
					onClick={submit}
					disabled={isSubmitting}
					endIcon={isSubmitting && <CircularProgress color='inherit' size={15} />}
					autoFocus
				>
					Create client
				</Button>
			</DialogActions>
		</>
	);
};

export default ReviewStep;
