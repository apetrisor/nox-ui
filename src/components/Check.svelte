<script>
	import FaRegCheckCircle from 'svelte-icons/fa/FaRegCheckCircle.svelte';
	import FaRegTimesCircle from 'svelte-icons/fa/FaRegTimesCircle.svelte';
	export let checked;

	let className = '';
	export {className as class};
</script>

<div class="nox-check {className}" class:checked>
	{#if checked}
		<slot name="checked">
			<FaRegCheckCircle />
		</slot>
	{:else}
		<slot name="unchecked">
			<FaRegTimesCircle />
		</slot>
	{/if}
</div>

<style>
	.nox-check {
		display: inline-block;
		vertical-align: middle;
		width: 22px;
		height: 22px;
		color: #f35858;
		&.checked {
			color: #41dc4e;
		}
	}
</style>
