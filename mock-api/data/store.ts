export const store: IStore = {
	entities: {},
};

export const addClient = (client: IClient) => {
	store.entities[client.id] = client;
};

export const updateClient = (client: IClient) => {
	store.entities[client.id] = client;
};

export const removeClient = (id: string) => {
	delete store.entities[id];
};

export const listClients = () => {
	const list = Object.keys(store.entities).map((id) => store.entities[id]);

	return list.sort((a, b) => {
		if (a.firstName < b.firstName) {
			return -1;
		}
		if (a.firstName > b.firstName) {
			return 1;
		}
		return 0;
	});
};
