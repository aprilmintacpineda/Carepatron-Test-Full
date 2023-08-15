import { memo, useEffect } from 'react';
import {
	Alert,
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	Link,
	Paper,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import Page from '../../components/Page';
import ClientTable from './ClientTable';
import { getClients } from '../../services/api';
import CreateClientButton from '../../components/CreateClientButton';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from 'react-query';

function Clients() {
	const { data, status, refetch } = useQuery({
		queryKey: 'listClients',
		queryFn: getClients,
	});

	return (
		<Page>
			<Typography variant='h4' sx={{ textAlign: 'start' }}>
				Clients
			</Typography>
			<Stack
				sx={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center',
					marginTop: 2,
				}}
			>
				<TextField
					sx={{ background: '#fff' }}
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton onClick={() => {}} size='small'>
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<CreateClientButton />
			</Stack>
			<Paper sx={{ margin: 'auto', marginTop: 3 }}>
				{!data ? (
					status === 'loading' ? (
						<CircularProgress />
					) : (
						<Alert severity='error'>
							An unknown error occurred.{' '}
							<Link
								onClick={() => {
									refetch();
								}}
								sx={{ cursor: 'pointer' }}
							>
								Try again
							</Link>
							.
						</Alert>
					)
				) : (
					<ClientTable clients={data} />
				)}
			</Paper>
		</Page>
	);
}

export default memo(Clients);
