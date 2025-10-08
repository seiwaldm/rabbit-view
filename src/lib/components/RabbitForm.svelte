<script>
	import listRabbits from '../../routes/+page.svelte';
	let name = $state('');
	async function addRabbit() {
		const response = await fetch('http://localhost:7070/rabbits', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name
			})
		});
		listRabbits();
	}
</script>

<input type="text" bind:value={name} />
<button class="cursor-pointer" onclick={addRabbit}>Add Rabbit!</button>
