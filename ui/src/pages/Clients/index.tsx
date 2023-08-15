import { memo, useState } from 'react';
import {
	Alert,
	Box,
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
import { useDebouncedCallback } from 'use-debounce';

function Clients() {
	const [{ clients, searchStatus }, setState] = useState<{
		clients: IClient[];
		searchStatus: 'loading' | 'success' | 'idle' | 'error';
	}>({
		clients: [],
		searchStatus: 'idle',
	});

	const {
		data,
		status: fetchStatus,
		refetch,
	} = useQuery({
		queryKey: 'listClients',
		queryFn: getClients,
		onSuccess: (clients) => {
			setState((oldState) => {
				return {
					...oldState,
					clients,
				};
			});
		},
	});

	const debouncedSearch = useDebouncedCallback((ev) => {
		try {
			const searchString = ev.target.value;

			if (searchString) {
				setState((oldState) => {
					return {
						...oldState,
						searchStatus: 'loading',
					};
				});

				const worker = new Worker(new URL('../../workers/clientsFuzzySearch.ts', import.meta.url));
				worker.postMessage({ clients: data || [], searchString });

				worker.onmessage = (ev) => {
					setState((oldState) => {
						return {
							...oldState,
							clients: ev.data as IClient[],
							searchStatus: 'success',
						};
					});
				};
			} else {
				setState((oldState) => {
					return {
						...oldState,
						clients: !searchString ? data || [] : oldState.clients,
						searchStatus: 'idle',
					};
				});
			}
		} catch (error) {
			setState((oldState) => {
				return {
					...oldState,
					searchStatus: 'error',
				};
			});
		}
	}, 500);

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
					sx={{ background: '#fff', width: 380 }}
					placeholder='Filter clients using name, email or phone'
					InputProps={{
						endAdornment: (
							<InputAdornment position='end'>
								<IconButton onClick={() => {}} size='small'>
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						),
					}}
					onChange={debouncedSearch}
				/>
				<CreateClientButton />
			</Stack>
			<Paper sx={{ margin: 'auto', marginTop: 3 }}>
				{fetchStatus === 'loading' || searchStatus === 'loading' ? (
					<Box padding={2}>
						<CircularProgress />
					</Box>
				) : fetchStatus === 'error' ? (
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
				) : (
					<ClientTable clients={clients} />
				)}
			</Paper>
		</Page>
	);
}

export default memo(Clients);
