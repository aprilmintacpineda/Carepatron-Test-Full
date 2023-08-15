import { Box, Dialog, DialogContent, DialogTitle, IconButton, Stack, Typography, keyframes } from '@mui/material';
import React, { useContext, useEffect, useRef } from 'react';
import { CreateClientContext } from '.';
import { steps } from './Steps';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Props = {
	isOpen: boolean;
	onClose: () => void;
};

const countdown = keyframes(`
	0% { width: 100% },
	100% { width: 0 }
`);

const CreateClientDialog: React.FunctionComponent<Props> = ({ isOpen, onClose }) => {
	const { activeStepIndex, status } = useContext(CreateClientContext);
	const { Component: CurrentStepComponent } = steps[activeStepIndex];
	const timerRef = useRef<NodeJS.Timeout>();

	const isSuccess = status === 'success';

	useEffect(() => {
		if (!isOpen) {
			const timer = timerRef.current;
			if (timer) clearTimeout(timer);
		} else if (isSuccess) {
			timerRef.current = setTimeout(onClose, 5000);
		}
	}, [onClose, isOpen, isSuccess]);

	return (
		<Dialog open={isOpen} fullWidth maxWidth='sm' onClose={isSuccess ? onClose : undefined}>
			{isSuccess ? (
				<>
					<Box
						sx={(theme) => {
							return {
								animation: `${countdown} 5s linear`,
								animationFillMode: 'forwards',
								height: '5px',
								background: theme.palette.primary.main,
							};
						}}
					/>
					<DialogContent>
						<Stack sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
							<CheckCircleIcon color='success' sx={{ fontSize: 50 }} />
							<Typography variant='h5'>Client created successfully.</Typography>
						</Stack>
					</DialogContent>
				</>
			) : (
				<>
					<DialogTitle
						sx={{
							paddingBottom: 0,
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Typography>Create new client</Typography>
						<IconButton size='small' onClick={onClose}>
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<CurrentStepComponent />
				</>
			)}
		</Dialog>
	);
};

export default CreateClientDialog;
