<script>
	let rabbits = $state([]);

	async function listRabbits() {
		const response = await fetch('http://localhost:7070/rabbits');
		console.log('response: ', response);
	}

	$effect(() => listRabbits());
</script>

<h1>Our Rabbits</h1>
