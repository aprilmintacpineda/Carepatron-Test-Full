/* eslint no-restricted-globals: 0 */

import fuzzysort from 'fuzzysort';

self.onmessage = (ev) => {
	const { clients, searchString } = ev.data as {
		clients: IClient[];
		searchString: string;
	};

	const results = fuzzysort
		.go(searchString, clients, {
			keys: ['email', 'firstName', 'lastName', 'phoneNumber'],
		})
		.map((result) => result.obj);

	self.postMessage(results);
};

export {};
