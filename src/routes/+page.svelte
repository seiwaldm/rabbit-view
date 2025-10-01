<script>
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

	// unser "Konstruktor" (lifecycle hook) - läuft jedesmal, wenn die Seite bzw. die Komponente geladen wird:
	$effect(() => {
		listRabbits();
		$inspect('🐰: ', rabbits);
	});
</script>

<!-- unser Template / HTML-Teil der Seite bzw. der Komponente -->
<h1 class="text-3xl">Our Rabbits</h1>

<table class="table-fixed">
	<thead>
		<tr>
			<th class="w-10">ID</th>
			<th>Name</th>
		</tr>
	</thead>
	<tbody>
		{#each rabbits as rabbit}
			<tr>
				<td class="pr-3 text-right">{rabbit.id}</td>
				<td class="pr-3">{rabbit.name}</td>
				<td
					><button onclick={() => deleteRabbit(rabbit.id)} class="cursor-pointer text-red-500"
						>x</button
					></td
				>
			</tr>
		{/each}
	</tbody>
</table>
