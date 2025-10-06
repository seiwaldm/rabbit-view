<script>
	// unsere Imports:
	import Icon from '@iconify/svelte';

	// unsere "Instanz- bzw. Komponentenvariablen":
	let rabbits = $state([]);

	// unsere Methoden zur Datenmanipulation:
	async function listRabbits() {
		const response = await fetch('http://localhost:7070/rabbits');
		console.log('response: ', response);
		rabbits = await response.json();
	}

	async function deleteRabbit(id) {
		const response = await fetch('http://localhost:7070/rabbits/' + id, {
			method: 'DELETE'
		});
		listRabbits();
	}

	async function editRabbit(id) {
		let newName = prompt('New Rabbit Name:', 'neuer Name');
		let editedRabbit = {
			name: newName
		};
		try {
			const response = await fetch('http://localhost:7070/rabbits/' + id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(editedRabbit)
			});
		} catch (error) {
			console.log(error);
		}
		listRabbits();
	}

	// unser "Konstruktor" (lifecycle hook) - läuft jedesmal, wenn die Seite bzw. die Komponente geladen wird:
	$effect(() => {
		listRabbits();
		$inspect('🐰: ', rabbits);
	});
</script>

<!-- unser Template / HTML-Teil der Seite bzw. der Komponente -->
<h1 class="text-3xl">Our Rabbits</h1>

<div class="grid w-[200px] grid-cols-[32px_1fr_32px_32px] items-end">
	<div>ID</div>
	<div>Name</div>
	<div></div>
	<div></div>

	{#each rabbits as rabbit}
		<div class="pr-3 text-right">{rabbit.id}</div>
		<div class="pr-3">{rabbit.name}</div>
		<div class="pr-3">
			<button onclick={() => editRabbit(rabbit.id)} class="cursor-pointer"
				><Icon icon="carbon:edit" width="16" height="16" /></button
			>
		</div>
		<div>
			<button onclick={() => deleteRabbit(rabbit.id)} class="cursor-pointer text-red-500">x</button>
		</div>
	{/each}
</div>
