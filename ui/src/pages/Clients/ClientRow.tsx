import { TableCell } from '@mui/material';
import { patternFormatter } from 'react-number-format';
import { phoneNumberFormat } from '../../constants/strings';

export interface IProps {
	client: IClient;
}

export default function ClientListItem({ client }: IProps) {
	const { firstName, lastName, email, phoneNumber } = client;

	return (
		<>
			<TableCell component='th' scope='row'>
				{firstName} {lastName}
			</TableCell>
			<TableCell>
				{patternFormatter(phoneNumber, {
					format: phoneNumberFormat,
				})}
			</TableCell>
			<TableCell>{email}</TableCell>
		</>
	);
}
