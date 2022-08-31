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

	function validateCoupon(value) {
		return value.trim()?.length > 4;
	}

	async function handleSubmit() {
		if(!validateCoupon(coupon)) return;
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
	<span class="block text-gray-700 text-sm font-bold mb-2">Code Promo</span>
	{#if editing}
		<form id="" action="#" on:submit|preventDefault={handleSubmit}>
			<div class="flex">
				<input
					type="text"
					id="coupon-code"
					placeholder="000000"
					on:input={(event) => (coupon = event.target.value)}
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
		<div class="flex justify-between items-center">
			<span
				aria-label="supprimer"
				class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 rounded-full bg-white text-gray-700 border"
			>
				{coupon}
				<svg class="ml-2" style="height: 14px;" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z"/></svg>
			</span>
			<button class="btn btn-error" on:click={handleDelete}>Supprimer</button>
		</div>
	{/if}

	<div class="mt-4">
		<button class="btn btn-primary w-full">Confirmer</button>
	</div>
</div>
