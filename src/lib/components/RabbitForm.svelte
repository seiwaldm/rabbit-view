<script>
	import { goto } from '$app/navigation';
	import { serverAddress, store, pb } from '$lib/store.svelte.js';

	let { rabbitId = '' } = $props();

	let rabbit = $state({
		name: 'New Name',
		rabbithole: ''
	});

	let rabbitholes = $state([]);

	let wrongRabbitName = $derived(rabbit.name.length > 0 && rabbit.name[0] !== 'J');

	async function addRabbit() {
		await store.addRabbit(rabbit);
		goto('/');
	}

	async function saveChanges() {
		await store.editRabbit(rabbitId, rabbit);
		goto('/');
	}

	$effect(async () => {
		rabbitholes = await pb.collection('rabbitholes').getFullList();
		if (rabbitId) {
			rabbit = Object.assign(
				{},
				store.rabbits.find((rabbit) => rabbitId === rabbit.id)
			);
		}
	});
</script>

<div class="flex flex-col gap-2">
	{#if rabbitId}
		<h1 class="text-lg font-bold">Edit rabbit with ID {rabbitId}</h1>
	{:else}
		<h1 class="text-lg font-bold">Add a rabbit</h1>
	{/if}

	<label class="input">
		<span class="label">Name</span>
		<input type="text" class="grow" bind:value={rabbit.name} />
	</label>

	<div>
		<label class="select">
			<span class="label">Rabbithole</span>
			<select bind:value={rabbit.rabbithole}>
				{#each rabbitholes as rabbithole (rabbithole.id)}
					<option value={rabbithole.id}>{rabbithole.name}</option>
				{/each}
			</select>
		</label>
	</div>

	{#if wrongRabbitName}
		<div role="alert" class="mt-4 alert alert-error">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>Watch out! Rabbit names must start with "J"!</span>
		</div>
	{/if}

	{#if rabbitId}
		<button
			class="btn btn-primary"
			onclick={saveChanges}
			disabled={wrongRabbitName || rabbit.name.length === 0}>Save Changes!</button
		>
	{:else}
		<button
			class="btn btn-primary"
			onclick={addRabbit}
			disabled={wrongRabbitName || rabbit.name.length === 0}>Add Rabbit!</button
		>
	{/if}
</div>
