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
		const { error } = await supabase.from('rabbits').update(rabbit).eq('id', id);
		if (error) {
			console.error('Error updating rabbit:', error);
		}
		store.listRabbits();
	},
	deleteRabbit: async function (id) {
		const { error } = await supabase.from('rabbits').delete().eq('id', id);
		// await pb.collection('rabbits').delete(id);
		store.listRabbits();
	},
	addRabbit: async (rabbit) => {
		const { data, error } = await supabase.from('rabbits').insert(rabbit).select();
		if (error) {
			console.error('Error adding rabbit:', error);
		}
		store.listRabbits();
	}
});
