<script>
	import '../app.css';
	import { store } from '$lib/store.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { browser } from '$app/environment';

	let { children } = $props();

	let theme = $state('halloween');

	// ALTERNATIVE APPROACH -> DISCUSS TOGETHER WITH CSR/SSR
	// let theme = $state(browser ? localStorage.getItem('theme') : 'halloween');

	function saveTheme() {
		localStorage.setItem('theme', theme);
	}

	// unser "Konstruktor" (lifecycle hook) - läuft jedesmal, wenn die Seite bzw. die Komponente geladen wird:
	$effect(() => {
		store.listRabbits();
		if (localStorage.getItem('theme')) theme = localStorage.getItem('theme');
		$inspect('🐰: ', store.rabbits);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div data-theme={theme} class=" min-h-screen p-2">
	<nav class=" flex items-center justify-between">
		<a href="/" class=" text-4xl">🐰</a>

		<select class="select w-[150px]" bind:value={theme}>
			<option disabled selected>Pick a theme</option>
			<option value="light" onclick={saveTheme}>light</option>
			<option value="dark" onclick={saveTheme}>dark</option>
			<option value="cyberpunk" onclick={saveTheme}>cyberpunk</option>
			<option value="valentine" onclick={saveTheme}>valentine</option>
			<option value="halloween" onclick={saveTheme}>halloween</option>
		</select>
	</nav>
	<main class="flex min-h-screen flex-col items-center justify-center">
		{@render children?.()}
	</main>
</div>
