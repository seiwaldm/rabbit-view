import PocketBase from 'pocketbase';

export const serverAddress = '10.20.227.50';
export const pb = new PocketBase('http://127.0.0.1:8090');

// export {serverAddress}; -> alternative Schreibweise, wenn kein export direkt bei der Variable!

export let store = $state({
	rabbits: [],
	listRabbits: async () => {
		store.rabbits = await pb.collection('rabbits').getFullList({
			expand: "rabbithole"
		});
	},

	editRabbit: async (id, newName) => {
		let editedRabbit = {
			name: newName
		};
		try {
			const record = await pb.collection('rabbits').update(id, editedRabbit);
			if (!response.ok) {
				alert(await response.text());
			}
		} catch (error) {
			console.log('FEHLER');
		}
		store.listRabbits();
	},
	deleteRabbit: async function (id) {
		await pb.collection('rabbits').delete(id);
		store.listRabbits();
	},
	addRabbit: async (rabbit) => {
		const response = await pb.collection('rabbits').create(rabbit);
		store.listRabbits();
		console.log(response);
	}
});
