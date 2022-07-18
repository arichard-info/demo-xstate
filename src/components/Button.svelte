<script>
    export let loading = false;
</script>

<style>
    
</style>

<button on:click  class:loading {...$$restProps}><slot/></button>