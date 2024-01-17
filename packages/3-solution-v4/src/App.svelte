<script>
	import { interpret } from 'xstate';

	import ApiToggle from 'common/components/ApiToggle.svelte';
	import TextField from 'common/components/TextField.svelte';
	import Button from 'common/components/Button.svelte';
	import Loader from 'common/components/Loader.svelte';
	import IconSuccess from 'common/components/IconSuccess.svelte';
	import IconError from 'common/components/IconSuccess.svelte';

	import machine from './state';

	const service = interpret(machine, { devTools: true }).start();
</script>

{#if $service.matches('confirmation')}
	<h1>Connecté</h1>
	<div class="card flex flex-col items-center">
		<IconSuccess class="h-16 w-16 text-green-600" />
		<h2>Bienvenue <strong>{$service.context.username}</strong> !</h2>
	</div>
{/if}
{#if $service.matches('error')}
	<h1>Erreur</h1>
	<div class="card flex flex-col items-center">
		<IconError class="h-16 w-16 text-red-600" />
		<h2>Une erreur est survenue</h2>
		<Button on:click={() => service.send('RETRY')}>Nouvelle tentative</Button>
	</div>
{/if}
{#if ['editing', 'submitting'].some($service.matches)}
	<h1>Connexion</h1>
	<div class="card">
		<form id="" action="#" on:submit|preventDefault={() => service.send('SUBMIT')}>
			<TextField
				label="Nom d'utilisateur"
				value={$service.context.username}
				on:input={(e) => service.send({ type: 'EDIT_USERNAME', value: e.target.value })}
				placeholder="user@email.com"
				id="username"
				autocomplete="username"
			/>
			<TextField
				label="Mot de passe"
				value={$service.context.password}
				on:input={(e) => service.send({ type: 'EDIT_PASSWORD', value: e.target.value })}
				type="password"
				class="mt-2"
				placeholder="••••••"
				id="password"
				autocomplete="current-password"
			/>
			<Button type="submit" variant="primary" stretched class="mt-5">
				{#if $service.matches('submitting')}
					<Loader class="-ml-1 mr-3 h-5 w-5 text-yellow-500" />
				{/if}
				Connexion
			</Button>
		</form>
	</div>
{/if}

<ApiToggle />
