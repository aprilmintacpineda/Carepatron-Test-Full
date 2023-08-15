import React from 'react';

export default function Page({ children }: { children?: React.ReactNode }) {
	return <div style={{ margin: 'auto', marginTop: 24, marginBottom: 24, maxWidth: '700px' }}>{children}</div>;
}
