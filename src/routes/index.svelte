<script>
    import Card from './../components/Card.svelte';
    import Button from './../components/Button.svelte';
    import TextInput from './../components/TextInput.svelte';
    import Label from './../components/Label.svelte';

    let coupon = "";
    let editing = !coupon;
    let loading = false;
    let error = false;

    function handleRetry() {
        error = false;
        editing = true;
    }

    async function handleDelete() {
        coupon = "";
        editing = true;
    }

    async function handleSubmit() {
        loading = true;
        return new Promise((resolve => (setTimeout(() => {
            editing = false;
            loading = false
            resolve(coupon);
        }, 2000))))
    }
</script>

<Card>
    {#if loading}
        ...
    {:else if editing}
        <form id="" action="#" on:submit|preventDefault={handleSubmit}>
            <Label for="coupon-code">Code Promo</Label>
            <div>
            <TextInput id="coupon-code" placeholder="000000" bind:value={coupon} />
            <Button type="submit" {loading}>Envoyer</Button>
        </div>
        </form>
    {:else if error}
        <Button on:click={handleRetry}>Retry</Button>
    {:else}
        <span>{coupon}</span>
        <Button on:click={handleDelete}>Delete</Button>
    {/if}
</Card>