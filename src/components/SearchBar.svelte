<script>
	import Image from './Image.svelte';
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

<style lang="scss" global>
	@import '../assets/variables';

	.nox-search-bar {
		width: 100%;
		color: $gray-700;
		transition: background $cubic-ease, width $cubic-ease;
		position: relative;

		.search-wrapper {
			background: #fff;
			border-radius: 8px;
			border: 1px solid $gray-400;
			> form {
				display: flex;
				button {
					width: 44px;
					padding: 13px;
					flex-shrink: 0;
				}

				input {
					width: 100%;
					background: none;
					font-size: 16px;
				}
			}
		}

		&.focused {
			&.autocompleted .search-wrapper {
				border-bottom-right-radius: 0;
				border-bottom-left-radius: 0;
			}
		}

		&.stretch {
			width: 200px;
			max-width: 100%;
			&.focused {
				width: 400px;
			}
		}

		&.tiny .search-wrapper > form {
			button {
				width: 36px;
				padding: 9px;
			}
			input {
				font-size: 15px;
			}
		}

		&.big .search-wrapper > form {
			button {
				width: 60px;
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
			border: 1px solid $gray-400;
			max-height: 400px;
			bottom: auto;
			border-bottom-right-radius: 8px;
			border-bottom-left-radius: 8px;
			box-shadow: $shadow-2xl;

			.item {
				padding: 0.8rem;
				display: flex;
				align-items: center;
				.item-image {
					width: 60px;
					margin-right: 1rem;
				}
				&:hover {
					background: $gray-100;
				}
			}
		}
	}
</style>

<svelte:window bind:innerWidth={screenWidth} />

<div
	class="nox-search-bar"
	class:focused={isFocused}
	class:autocompleted={isAutocompleted}
	class:stretch
	class:tiny={size === 'tiny'}
	class:big={size === 'big'}
>
	<div class="search-wrapper">
		<form on:submit|preventDefault={handleSubmit}>
			<button type="submit" title={placeholder}>
				<SearchIcon />
			</button>
			<input {placeholder} bind:this={inputElement} bind:value on:focus|stopPropagation={handleFocus} on:blur={handleBlur} on:input={handleChange} />
			{#if value}
				<button title="Clear Search" type="button" on:click|stopPropagation={handleClear}>
					<XIcon />
				</button>
			{/if}
		</form>

		{#if !overlayVisible && isFocused && isAutocompleted}
			<div class="suggestions" transition:fly={{y: -20, duration: 400}}>
				{#each autocompleteData as item}
					<a class="item" href={item.url}>
						{#if item.image}
							<div class="item-image"><Image src={item.image} alt={item.text} /></div>
						{/if}
						<span>{item.text}</span>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</div>

{#if overlayVisible}
	<SearchOverlay on:close={() => (overlayVisible = false)} on:search {placeholder} {value} {autocomplete} />
{/if}
