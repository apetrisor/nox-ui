<script>
	import SearchIcon from 'svelte-feather-icons/src/icons/SearchIcon.svelte';
	import XIcon from 'svelte-feather-icons/src/icons/XIcon.svelte';
	import {createEventDispatcher} from 'svelte';
	const dispatch = createEventDispatcher();

	export let value = '';
	export let small = false;

	const handleClear = () => (value = '');
	const handleSubmit = () => dispatch('search', value);
</script>

<style lang="scss" global>
	@import '../styles/variables';

	.nox-search-bar {
		width: 100%;
		display: flex;
		color: $gray-700;
		background: $gray-200;
		border-radius: 8px;
		border: 1px solid transparent;

		button {
			width: 60px;
			padding: 18px;
			flex-shrink: 0;
		}

		input {
			padding: 10px 0;
			width: 100%;
			background: none;
			font-size: 18px;
		}

		&.small {
			button {
				width: 44px;
				padding: 13px;
			}
			input {
				font-size: 16px;
			}
		}
	}
</style>

<form class="nox-search-bar" class:small on:submit|preventDefault={handleSubmit}>
	<button type="submit" title="Search Undissimo">
		<SearchIcon />
	</button>
	<input placeholder="Search underwear" bind:value />
	{#if value}
		<button title="Clear Search" on:click={handleClear}>
			<XIcon />
		</button>
	{/if}
</form>
