import { useContext } from 'react';
import { CreateClientContext } from '.';
import { Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

type Props = {
	disabled?: boolean;
};

const CreateClientBackButton: React.FunctionComponent<Props> = ({ disabled }) => {
	const { activeStepIndex, handleBack } = useContext(CreateClientContext);

	if (activeStepIndex > 0) {
		return (
			<Button startIcon={<KeyboardBackspaceIcon />} onClick={handleBack} disabled={disabled}>
				Back
			</Button>
		);
	}

	return <span />;
};

export default CreateClientBackButton;
