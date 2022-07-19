<script>
	import Loader from './../components/Loader.svelte';

	let coupon = '';
	let editing = !coupon;
	let loading = false;
	let error = false;

	function handleRetry() {
		error = false;
		editing = true;
	}

	async function handleDelete() {
		coupon = '';
		editing = true;
	}

	async function handleSubmit() {
		loading = true;
		return new Promise((resolve) =>
			setTimeout(() => {
				editing = false;
				loading = false;
				resolve(coupon);
			}, 2000)
		);
	}
</script>

<div class="card mt-4">
	{#if editing}
		<form id="" action="#" on:submit|preventDefault={handleSubmit}>
			<label for="coupon-code" class="block text-gray-700 text-sm font-bold mb-2">Code Promo</label>
			<div class="flex">
				<input
					type="text"
					id="coupon-code"
					placeholder="000000"
					bind:value={coupon}
					class="textinput mr-2"
					disabled={loading}
				/>
				<button class="btn btn-secondary" type="loading">
					{#if loading}
						<Loader class="-ml-1 mr-3 h-5 w-5 text-blue-500" />
					{/if}
					Envoyer
				</button>
			</div>
		</form>
	{:else if error}
		<button class="btn btn-secondary" on:click={handleRetry}>Retry</button>
	{:else}
		<span>{coupon}</span>
		<button class="btn btn-secondary" on:click={handleDelete}>Delete</button>
	{/if}

	<div class="mt-4">
		<button class="btn btn-primary w-full">Confirmer</button>
	</div>
</div>
