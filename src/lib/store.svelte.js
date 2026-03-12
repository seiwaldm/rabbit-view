import { browser } from '$app/environment';
import { supabase } from '$lib/supabaseClient';
import PocketBase from 'pocketbase';
export const pb = new PocketBase('http://127.0.0.1:8090');

export let store = $state({
	rabbits: [],
	listRabbits: async () => {
		let { data: rabbits, error } = await supabase.from('rabbits').select('*,rabbitholes(name)');
		console.log(rabbits);
		store.rabbits = rabbits;
	},

	editRabbit: async (id, rabbit) => {
		try {
			const record = await pb.collection('rabbits').update(id, rabbit);
			if (!response.ok) {
				alert(await response.text());
			}
		} catch (error) {
			console.log('FEHLER');
		}
		store.listRabbits();
	},
	deleteRabbit: async function (id) {
		const { error } = await supabase.from('rabbits').delete().eq('id', id);
		// await pb.collection('rabbits').delete(id);
		store.listRabbits();
	},
	addRabbit: async (rabbit) => {
		const response = await pb.collection('rabbits').create(rabbit);
		store.listRabbits();
		console.log(response);
	}
});
