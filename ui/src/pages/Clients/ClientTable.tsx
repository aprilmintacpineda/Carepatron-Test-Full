import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ClientRow from './ClientRow';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import React from 'react';
import { Box } from '@mui/material';

const VirtuosoComponents: TableComponents<IClient> = {
	Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
		<TableContainer component={Paper} {...props} ref={ref} />
	)),
	Table: (props) => <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />,
	TableHead,
	TableRow: ({ item, ...props }) => <TableRow {...props} />,
	TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
	return (
		<TableRow sx={{ background: '#fff', boxShadow: '0 0 5px #d0d1d5' }}>
			<TableCell>Name</TableCell>
			<TableCell>Phone number</TableCell>
			<TableCell>Email</TableCell>
		</TableRow>
	);
}

function rowContent(index: number, client: IClient) {
	console.log('rowContent', client);

	return <ClientRow client={client} />;
}

export default function BasicTable({ clients }: { clients: IClient[] }) {
	return (
		<Box sx={{ maxWidth: '100%', height: 'calc(100vh - 180px)' }}>
			<TableVirtuoso
				data={clients}
				components={VirtuosoComponents}
				fixedHeaderContent={fixedHeaderContent}
				itemContent={rowContent}
			/>
		</Box>
	);
}
