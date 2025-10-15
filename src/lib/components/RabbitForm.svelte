<script>
	import { serverAddress } from '$lib/store';

	let name = $state('');
	async function addRabbit() {
		const response = await fetch(`http://${serverAddress}:7070/rabbits`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: name
			})
		});
		name = '';
	}
</script>

<input type="text" bind:value={name} />
<button class="cursor-pointer" onclick={addRabbit}>Add Rabbit!</button>
