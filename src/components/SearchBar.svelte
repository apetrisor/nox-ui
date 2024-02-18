<script>
	import ListItem from './ListItem.svelte';
	import SearchOverlay from './SearchOverlay.svelte';
	import debounce from 'lodash/debounce';
	import SearchIcon from 'svelte-feather-icons/src/icons/SearchIcon.svelte';
	import XIcon from 'svelte-feather-icons/src/icons/XIcon.svelte';
	import {fly} from 'svelte/transition';
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher();

	export let value = '';
	export let size = 'normal';
	export let stretch = false;
	export let placeholder = 'search';
	export let autocomplete;
	export let overlayBreakpoint = 768;

	let inputElement;
	let screenWidth = 1280;
	let overlayVisible = false;

	let isFocused = false;
	const handleFocus = () => {
		isFocused = true;
		if (screenWidth < overlayBreakpoint) overlayVisible = true;
	};
	const handleBlur = () => (isFocused = false);

	let autocompleteData = [];
	$: isAutocompleted = autocompleteData.length > 0;
	const handleChange = autocomplete && debounce(async e => (autocompleteData = await autocomplete(e.target.value)), 300);

	const handleClear = () => {
		value = '';
		autocompleteData = [];
		inputElement.focus();
	};
	const handleSubmit = () => dispatch('search', value);
</script>

<svelte:window bind:innerWidth={screenWidth} />

<div
	class="nox-search-bar"
	class:focused={isFocused}
	class:autocompleted={isAutocompleted}
	class:stretch
	class:tiny={size === 'tiny'}
	class:big={size === 'big'}
>
	<form on:submit|preventDefault={handleSubmit}>
		<button type="submit" title={placeholder}>
			<SearchIcon size="18" />
		</button>
		<input {placeholder} bind:this={inputElement} bind:value on:focus|stopPropagation={handleFocus} on:blur={handleBlur} on:input={handleChange} />
		{#if value}
			<button title="Clear Search" type="button" on:click|stopPropagation={handleClear}>
				<XIcon size="18" />
			</button>
		{/if}
	</form>

	{#if !overlayVisible && isFocused && isAutocompleted}
		<div class="suggestions" transition:fly={{y: -20, duration: 400}}>
			{#each autocompleteData as item}
				<ListItem title={item.text} href={item.url} image={item.image} />
			{/each}
		</div>
	{/if}
</div>

{#if overlayVisible}
	<SearchOverlay on:close={() => (overlayVisible = false)} on:search {placeholder} {value} {autocomplete} />
{/if}

<style lang="scss" global>
	@import '../assets/variables';

	.nox-search-bar {
		width: 100%;
		color: $gray-700;
		transition:
			background $cubic-ease,
			width $cubic-ease;
		position: relative;
		background: #fff;
		border-radius: 8px;
		border: 1px solid $gray-400;

		&.focused.autocompleted {
			border-bottom-right-radius: 0;
			border-bottom-left-radius: 0;
		}

		&.stretch {
			width: 200px;
			max-width: 100%;
			&.focused {
				width: 400px;
			}
		}

		form {
			display: flex;
			button {
				padding: 13px;
			}
			input {
				width: 100%;
				background: none;
				font-size: 16px;
			}
		}

		&.tiny form {
			button {
				padding: 9px;
			}
			input {
				font-size: 15px;
			}
		}

		&.big form {
			button {
				padding: 18px;
			}
			input {
				font-size: 18px;
			}
		}

		.suggestions {
			position: absolute;
			z-index: 999;
			background: #fff;
			left: 0;
			right: 0;
			bottom: 0;
			overflow-y: scroll;
			overflow-x: hidden;
			border: 1px solid $gray-400;
			max-height: 400px;
			bottom: auto;
			border-bottom-right-radius: 8px;
			border-bottom-left-radius: 8px;
			box-shadow: $shadow-2xl;

			.nox-list-item a {
				&:hover {
					background: $gray-100;
					border-color: transparent;
				}
			}
		}
	}
</style>
