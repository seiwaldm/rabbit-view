<script>
	import { pb } from '$lib/store.svelte';

	let email = $state('');
	let username = $state('');
	let password1 = $state('');
	let password2 = $state('');

	async function registerUser() {
		const data = {
			email: email,
			emailVisibility: true,
			name: username,
			password: password1,
			passwordConfirm: password2
		};
		const record = await pb.collection('users').create(data);
	}
</script>

<div class="card max-w-96 bg-base-100 shadow-sm">
	<div class="card-body">
		<form action="">
			<h2 class="card-title">Register</h2>

			<fieldset class="fieldset">
				<legend class="fieldset-legend">Mail</legend>
				<input
					type="email"
					class="input"
					placeholder="Where can we reach you?"
					bind:value={email}
				/>
			</fieldset>
			<fieldset class="fieldset">
				<legend class="fieldset-legend">Username</legend>
				<input
					type="text"
					class="input"
					placeholder="How should we call you?"
					bind:value={username}
				/>
			</fieldset>
			<fieldset class="fieldset">
				<legend class="fieldset-legend">Password</legend>
				<input
					type="password"
					class="input"
					placeholder="Choose a safe one!"
					bind:value={password1}
				/>
				<input type="password" class="input" placeholder="Please repeat!" bind:value={password2} />
			</fieldset>
			<div class="card-actions justify-end">
				<button class="btn btn-primary" onclick={registerUser}>Register</button>
			</div>
		</form>
	</div>
</div>
