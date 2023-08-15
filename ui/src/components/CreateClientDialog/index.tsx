import { createContext, useCallback, useEffect, useState } from 'react';
import CreateClientDialog from './Dialog';
import { lastStepIndex } from './Steps';

type Form = typeof initialValues;

type Status = 'initial' | 'submitting' | 'error' | 'success';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const initialValues = {
	firstName: '',
	lastName: '',
	phoneNumber: '',
	email: '',
};

export const CreateClientContext = createContext<{
	values: Form;
	setValues: React.Dispatch<React.SetStateAction<Form>>;
	activeStepIndex: number;
	isLastStep: boolean;
	handleNext: (formValues: Partial<Form>) => void;
	handleBack: () => void;
	status: Status;
	setStatus: React.Dispatch<React.SetStateAction<Status>>;
}>({} as any);

const CreateClientDialogProvider: React.FunctionComponent<Props> = ({ isOpen, onClose }) => {
	const [values, setValues] = useState(initialValues);
	const [activeStepIndex, setActiveStepIndex] = useState(0);
	const [status, setStatus] = useState<Status>('initial');

	const isLastStep = activeStepIndex === lastStepIndex;

	const handleNext = useCallback((form: Partial<Form>) => {
		setValues((current) => {
			return {
				...current,
				...form,
			};
		});

		setActiveStepIndex((current) => Math.min(lastStepIndex, current + 1));
	}, []);

	const handleBack = useCallback(() => {
		setActiveStepIndex((current) => Math.max(0, current - 1));
	}, []);

	useEffect(() => {
		return () => {
			if (!isOpen) {
				setValues(initialValues);
				setActiveStepIndex(0);
				setStatus('initial');
			}
		};
	}, [isOpen]);

	return (
		<CreateClientContext.Provider
			value={{ values, setValues, activeStepIndex, isLastStep, handleNext, handleBack, status, setStatus }}
		>
			<CreateClientDialog isOpen={isOpen} onClose={onClose} />
		</CreateClientContext.Provider>
	);
};

export default CreateClientDialogProvider;
