<script>
	import TextField from './../components/TextField.svelte';
	import Button from './../components/Button.svelte';

	import * as api from './../lib/api';

	let username = '';
	let password = '';

	let loading = false;
	let error = false;
	let loggedIn = false;

	function handleRetry() {
		error = false;
	}

	async function handleLogout() {
		loggedIn = false;
	}

	async function handleSubmit() {
		if (!password || !username || loading) return;

		loading = true;
		await api.login();
		loading = false;
		loggedIn = true;
	}
</script>

{#if loggedIn}
	<h1>Connecté</h1>
	<div class="card">
		<Button on:click={handleLogout}>Log out</Button>
	</div>
{:else if error}
	<h1>Erreur</h1>
	<div class="card">
		<Button on:click={handleRetry}>Retry</Button>
	</div>
{:else}
	<h1>Connexion</h1>
	<div class="card">
		<form id="" action="#" on:submit|preventDefault={handleSubmit}>
			<TextField
				label="Email"
				bind:value={username}
				disabled={loading}
				placeholder="user@email.com"
				id="username"
			/>
			<TextField
				type="password"
				class="mt-2"
				label="Mot de passe"
				bind:value={password}
				disabled={loading}
				placeholder="••••••"
				id="password"
			/>
			<Button type="submit" variant="primary" stretched class="mt-5">Connexion</Button>
		</form>
	</div>
{/if}
