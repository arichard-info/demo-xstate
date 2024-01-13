<script>
	import { createActor } from 'xstate';

	import ApiToggle from 'common/components/ApiToggle.svelte';
	import TextField from 'common/components/TextField.svelte';
	import Button from 'common/components/Button.svelte';
	import Loader from 'common/components/Loader.svelte';
	import IconSuccess from 'common/components/IconSuccess.svelte';
	import IconError from 'common/components/IconSuccess.svelte';

	import machine from './state';

	const actor = createActor(machine);
	actor.start();

	$: console.log($actor)
</script>

{#if $actor.matches('confirmation')}
	<h1>Connecté</h1>
	<div class="card flex flex-col items-center">
		<IconSuccess class="h-16 w-16 text-green-600" />
		<h2>Bienvenue <strong>{$actor.context.username}</strong> !</h2>
	</div>
{/if}
{#if $actor.matches('error')}
	<h1>Erreur</h1>
	<div class="card flex flex-col items-center">
		<IconError class="h-16 w-16 text-red-600" />
		<h2>Une erreur est survenue</h2>
		<Button on:click={() => actor.send({ type: 'RETRY' })}>Nouvelle tentative</Button>
	</div>
{/if}
{#if ['editing', 'submitting'].some(state => $actor.matches(state))}
	<h1>Connexion</h1>
	<div class="card">
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
					<Loader class="-ml-1 mr-3 h-5 w-5 text-yellow-500" />
				{/if}
				Connexion
			</Button>
		</form>
	</div>
{/if}

<ApiToggle />
