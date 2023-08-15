import { Button } from '@mui/material';
import React, { useCallback, useState } from 'react';
import CreateClientDialog from '../CreateClientDialog';

const CreateClientButton: React.FunctionComponent = () => {
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback(() => {
		setIsOpen(true);
	}, []);

	const close = useCallback(() => {
		setIsOpen(false);
	}, []);

	return (
		<>
			<Button variant='contained' onClick={open}>
				Create new client
			</Button>
			<CreateClientDialog isOpen={isOpen} onClose={close} />
		</>
	);
};

export default CreateClientButton;
