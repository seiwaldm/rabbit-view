<script>
	import RabbitForm from '$lib/components/RabbitForm.svelte';
	import { serverAddress, store } from '$lib/store.svelte.js';
	import Icon from '@iconify/svelte';

	let currentRabbitId = $state();
	let newName = $state('');
	let wrongRabbitName = $derived(newName[0] !== 'J' && newName.length > 0);

	async function editRabbit() {
		if (newName[0] === 'J') {
			await store.editRabbit(currentRabbitId, newName);
			newName = '';
		} else {
		}
	}

	
</script>

<!-- unser Template / HTML-Teil der Seite bzw. der Komponente -->
<h1 class="text-3xl">Our Rabbits</h1>

<div class="grid w-[200px] grid-cols-[32px_1fr_1fr_32px_32px] items-end">
	<div>Nr.</div>
	<div>Name</div>
	<div>Hasenbau</div>
	<div></div>
	<div></div>

	{#each store.rabbits as rabbit, index}
		<div class="pr-3 text-right">{index + 1}</div>
		<div class="pr-3">{rabbit.name}</div>
		{#if rabbit.expand.rabbithole}
			<div class="pr-3">{rabbit.expand.rabbithole.name}</div>
		{:else}
			<div></div>
		{/if}
		<div class="pr-3">
			<button
				onclick={() => {
					currentRabbitId = rabbit.id;
					editingModal.showModal();
				}}
				class="cursor-pointer"><Icon icon="carbon:edit" width="16" height="16" /></button
			>
		</div>
		<div>
			<button onclick={() => store.deleteRabbit(rabbit.id)} class="cursor-pointer text-red-500"
				>x</button
			>
		</div>
	{/each}
</div>

<dialog id="editingModal" class="modal">
	<div class="modal-box">
		<h3 class="text-lg font-bold">Edit rabbit with ID {currentRabbitId}</h3>
		<input type="text" placeholder="new rabbit name" bind:value={newName} class="text-black" />
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
		<div class="modal-action">
			<form method="dialog" class="flex gap-2">
				<!-- if there is a button in form, it will close the modal -->
				<button class="btn">Cancel</button>
				<button
					class="btn btn-primary"
					onclick={editRabbit}
					disabled={wrongRabbitName || newName === ''}>Change Name!</button
				>
			</form>
		</div>
	</div>
</dialog>

<a href="/add"><button class="btn btn-primary"> New Rabbit! </button></a>
