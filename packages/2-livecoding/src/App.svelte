<script>
	import { interpret } from 'xstate';
	import loginMachine from './state';

	import ApiToggle from 'common/components/ApiToggle.svelte';
	import TextField from 'common/components/TextField.svelte';
	import Button from 'common/components/Button.svelte';
	import Loader from 'common/components/Loader.svelte';
	import IconSuccess from 'common/components/IconSuccess.svelte';
	import IconError from 'common/components/IconSuccess.svelte';

	import * as api from 'common/api';

	const loginService = interpret(loginMachine, { devTools: true }).start();

	let username = '';
	let password = '';

	let loading = false;
	let error = false;
	let loggedIn = false;

	const handleRetry = () => {
		error = false;
		username = '';
		password = '';
	};

	const handleSubmit = async () => {
		if (!password || !username) return;
		loading = true;
		try {
			await api.login();
			loading = false;
			loggedIn = true;
		} catch (err) {
			loading = false;
			error = true;
		}
	};
</script>

{#if loggedIn}
	<h1>Connecté</h1>
	<div class="card flex flex-col items-center">
		<IconSuccess class="h-16 w-16 text-green-600" />
		<h2>Bienvenue <strong>{username}</strong> !</h2>
	</div>
{:else if error}
	<h1>Erreur</h1>
	<div class="card flex flex-col items-center">
		<IconError class="h-16 w-16 text-red-600" />
		<h2>Une erreur est survenue</h2>
		<Button on:click={handleRetry}>Nouvelle tentative</Button>
	</div>
{:else}
	<h1>Connexion</h1>
	<div class="card">
		<form id="" action="#" on:submit|preventDefault={handleSubmit}>
			<TextField
				label="Nom d'utilisateur"
				value={username}
				on:input={(event) => (username = event.target.value)}
				placeholder="user@email.com"
				id="username"
				autocomplete="username"
			/>
			<TextField
				label="Mot de passe"
				value={password}
				on:input={(event) => (password = event.target.value)}
				type="password"
				class="mt-2"
				placeholder="••••••"
				id="password"
				autocomplete="current-password"
			/>
			<Button type="submit" variant="primary" stretched class="mt-5">
				{#if loading}
					<Loader class="-ml-1 mr-3 h-5 w-5 text-yellow-500" />
				{/if}
				Connexion
			</Button>
		</form>
	</div>
{/if}

<ApiToggle />
