<script>
	import SearchIcon from 'svelte-feather-icons/src/icons/SearchIcon.svelte';
	import XIcon from 'svelte-feather-icons/src/icons/XIcon.svelte';
	import {createEventDispatcher} from 'svelte';
	const dispatch = createEventDispatcher();

	export let value = '';
	export let small = false;
	export let stretch = false;
	export let placeholder = 'search';

	const handleClear = () => (value = '');
	const handleSubmit = () => dispatch('search', value);

	let focused = false;
	const handleFocus = () => (focused = true);
	const handleBlur = () => (focused = false);
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
		transition: width $cubic-ease;

		&.stretch {
			width: 200px;
			max-width: 100%;
			&.focused {
				width: 400px;
			}
		}

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

<form class="nox-search-bar" class:focused class:small class:stretch on:submit|preventDefault={handleSubmit}>
	<button type="submit" title={placeholder}>
		<SearchIcon />
	</button>
	<input {placeholder} bind:value on:focus={handleFocus} on:blur={handleBlur} />
	{#if value}
		<button title="Clear Search" on:click={handleClear}>
			<XIcon />
		</button>
	{/if}
</form>
