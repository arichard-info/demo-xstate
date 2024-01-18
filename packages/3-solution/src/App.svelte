<script>
	import { createActor } from "xstate";

	import ApiToggle from 'common/components/ApiToggle.svelte';
	import TextField from 'common/components/TextField.svelte';
	import Button from 'common/components/Button.svelte';
	import Loader from 'common/components/Loader.svelte';

	import machine from './state';

	const actor = createActor(machine);
	actor.start();
</script>

{#if $actor.matches('confirmation')}
	<div class="card">
		<span class="emoji">🍻</span>
		<h1>Vous êtes connecté !</h1>
		<h2>Bienvenue <strong>{$actor.context.username}</strong> !</h2>
	</div>
{/if}
{#if $actor.matches('error')}
	<div class="card">
		<span class="emoji">😕</span>
		<h1>Erreur</h1>
		<h2>Une erreur est survenue</h2>
		<Button on:click={() => actor.send({ type: 'RETRY' })}>Nouvelle tentative</Button>
	</div>
{/if}
{#if ['editing', 'submitting'].some(state => $actor.matches(state))}
	<div class="card">
		<h1>Connexion</h1>
		<form id="" action="#" on:submit|preventDefault={() => actor.send({ type: 'SUBMIT' })}>
			<TextField
				label="Nom d'utilisateur"
				value={$actor.context.username}
				on:input={(e) => actor.send({ type: 'EDIT_USERNAME', value: e.target.value })}
				placeholder="user@email.com"
				id="username"
				autocomplete="username"
			/>
			<TextField
				label="Mot de passe"
				value={$actor.context.password}
				on:input={(e) => actor.send({ type: 'EDIT_PASSWORD', value: e.target.value })}
				type="password"
				class="mt-2"
				placeholder="••••••"
				id="password"
				autocomplete="current-password"
			/>
			<Button type="submit" variant="primary" stretched class="mt-5">
				{#if $actor.matches('submitting')}
					<Loader class="-ml-1 mr-3 h-5 w-5 text-blue-600" />
				{/if}
				Valider
			</Button>
		</form>
	</div>
{/if}

<ApiToggle />
