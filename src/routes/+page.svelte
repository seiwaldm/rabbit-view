<script>
	import RabbitForm from '$lib/components/RabbitForm.svelte';
	import UserAuth from '$lib/components/UserAuth.svelte';
	import { pb, serverAddress, store } from '$lib/store.svelte.js';
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

{#if pb.authStore.isValid}
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
			<a href={'/' + rabbit.id}>
				<div class="pr-3">
					<button class="cursor-pointer"><Icon icon="carbon:edit" width="16" height="16" /></button>
				</div>
			</a>
			<div>
				<button onclick={() => store.deleteRabbit(rabbit.id)} class="cursor-pointer text-red-500"
					>x</button
				>
			</div>
		{/each}
	</div>

	<a href="/add"><button class="btn btn-primary"> New Rabbit! </button></a>
{:else}
	<UserAuth></UserAuth>
{/if}
