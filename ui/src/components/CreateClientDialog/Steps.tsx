import { Step, StepLabel, Stepper } from '@mui/material';
import PersonalDetailsStep from './PersonalDetailsStep';
import ContactDetailsStep from './ContactDetailsStep';
import { useContext } from 'react';
import { CreateClientContext } from '.';
import ReviewStep from './ReviewStep';

export const steps = [
	{
		label: 'Personal details',
		Component: PersonalDetailsStep,
	},
	{
		label: 'Contact details',
		Component: ContactDetailsStep,
	},
	{
		label: 'Review',
		Component: ReviewStep,
	},
] as const;

export const lastStepIndex = steps.length - 1;

const CreateClientSteps: React.FunctionComponent = () => {
	const { activeStepIndex } = useContext(CreateClientContext);

	return (
		<Stepper activeStep={activeStepIndex} sx={{ marginBottom: 1 }}>
			{steps.map(({ label }) => (
				<Step key={label}>
					<StepLabel>{label}</StepLabel>
				</Step>
			))}
		</Stepper>
	);
};

export default CreateClientSteps;
