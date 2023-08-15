import { createTheme, responsiveFontSizes } from '@mui/material';

const theme = createTheme({
	typography: {
		button: {
			textTransform: 'none',
		},
	},
	components: {
		MuiTextField: {
			defaultProps: {
				size: 'small',
				margin: 'dense',
			},
		},
	},
});

export default responsiveFontSizes(theme);
