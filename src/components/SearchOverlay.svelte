<script>
	import Image from './Image.svelte';
	import debounce from 'lodash/debounce';
	import SearchIcon from 'svelte-feather-icons/src/icons/SearchIcon.svelte';
	import XIcon from 'svelte-feather-icons/src/icons/XIcon.svelte';
	import ArrowLeftIcon from 'svelte-feather-icons/src/icons/ArrowLeftIcon.svelte';
	import {fly} from 'svelte/transition';
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher();

	export let value = '';
	export let size = 'normal';
	export let stretch = false;
	export let placeholder = 'search';
	export let autocomplete;

	let inputElement;
	let screenWidth = 1280;
	$: isMobile = screenWidth < 1024;

	let isFocused = false;
	const handleFocus = () => {
		isFocused = true;
		if (!isOpen) isOpen = true;
		if (isMobile) document.body.style['overflow'] = 'hidden';
	};
	const handleBlur = () => {
		isFocused = false;
		// On mobile do no close on blur
		if (!isMobile) isOpen = false;
		document.body.style['overflow'] = '';
	};

	let autocompleteData = [];
	$: isAutocompleted = autocompleteData.length > 0;
	const handleChange = autocomplete && debounce(async e => (autocompleteData = await autocomplete(e.target.value)), 300);

	let isOpen = false;
	const handleClose = () => {
		isOpen = false;
		value = '';
		autocompleteData = [];
	};

	const handleClear = e => {
		value = '';
		autocompleteData = [];
		inputElement.focus();
	};
	const handleSubmit = () => dispatch('search', value);
</script>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-search-overlay {
		width: 100%;
		color: $gray-700;
		transition: background $cubic-ease, width $cubic-ease;
		position: relative;

		.search-wrapper {
			background: #fff;
			border-radius: 8px;
			border: 1px solid $gray-400;
		}

		&.open {
			&.autocompleted .search-wrapper {
				border-bottom-right-radius: 0;
				border-bottom-left-radius: 0;
			}

			&.mobile .search-wrapper {
				position: fixed;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				z-index: 2000;
				overflow-y: scroll;
			}
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
		}

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

		&.tiny {
			button {
				width: 36px;
				padding: 9px;
			}
			input {
				font-size: 15px;
			}
		}

		&.big {
			button {
				width: 60px;
				padding: 18px;
			}
			input {
				font-size: 18px;
			}
		}

		.suggestions {
			border-top: 1px solid $gray-400;
			position: absolute;
			z-index: 999;
			background: #fff;
			left: 0;
			right: 0;
			bottom: 0;
			overflow-y: scroll;
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
			@media (min-width: 1024px) {
				border: 1px solid $gray-400;
				max-height: 400px;
				bottom: auto;
				border-bottom-right-radius: 8px;
				border-bottom-left-radius: 8px;
				box-shadow: $shadow-2xl;
			}
		}
	}
</style>

<svelte:window bind:innerWidth={screenWidth} />

<div
	class="nox-search-overlay"
	class:focused={isFocused}
	class:open={isOpen}
	class:autocompleted={isAutocompleted}
	class:mobile={isMobile}
	class:stretch
	class:tiny={size === 'tiny'}
	class:big={size === 'big'}
>
	<div class="search-wrapper">
		<form on:submit|preventDefault={handleSubmit}>
			{#if isMobile && isOpen}
				<button type="button" on:click|stopPropagation={handleClose}>
					<ArrowLeftIcon />
				</button>
			{:else}
				<button type="submit" title={placeholder}>
					<SearchIcon />
				</button>
			{/if}
			<input {placeholder} bind:this={inputElement} bind:value on:focus|stopPropagation={handleFocus} on:blur={handleBlur} on:input={handleChange} />
			{#if value}
				<button title="Clear Search" type="button" on:click|stopPropagation={handleClear}>
					<XIcon />
				</button>
			{/if}
		</form>

		{#if isOpen && isAutocompleted}
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
