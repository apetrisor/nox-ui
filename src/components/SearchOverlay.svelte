<script>
	import ListItem from './ListItem.svelte';
	import debounce from 'lodash/debounce';
	import XIcon from 'svelte-feather-icons/src/icons/XIcon.svelte';
	import ArrowLeftIcon from 'svelte-feather-icons/src/icons/ArrowLeftIcon.svelte';
	import {fly} from 'svelte/transition';
	import {createEventDispatcher, onMount} from 'svelte';

	const dispatch = createEventDispatcher();

	export let value = '';
	export let placeholder = 'search';
	export let autocomplete;

	let inputElement;

	onMount(() => {
		inputElement.focus();
		document.body.style['overflow'] = 'hidden';
		return () => (document.body.style['overflow'] = '');
	});

	let autocompleteData = [];
	$: isAutocompleted = autocompleteData.length > 0;
	const handleChange = autocomplete && debounce(async e => (autocompleteData = await autocomplete(e.target.value)), 300);

	const handleClose = () => {
		value = '';
		autocompleteData = [];
		dispatch('close');
	};

	const handleClear = e => {
		value = '';
		autocompleteData = [];
		inputElement.focus();
	};
	const handleSubmit = () => dispatch('search', value);
	const handleItemClick = () => dispatch('close');
</script>

<div class="nox-search-overlay" class:autocompleted={isAutocompleted}>
	<form on:submit|preventDefault={handleSubmit}>
		<button type="button" on:click|stopPropagation={handleClose}>
			<ArrowLeftIcon />
		</button>
		<input {placeholder} bind:this={inputElement} bind:value on:input={handleChange} />
		{#if value}
			<button title="Clear Search" type="button" on:click|stopPropagation={handleClear}>
				<XIcon />
			</button>
		{/if}
	</form>

	{#if isAutocompleted}
		<div class="suggestions" transition:fly={{y: -20, duration: 400}}>
			{#each autocompleteData as item}
				<ListItem title={item.text} href={item.url} image={item.image} on:click={handleItemClick} />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-search-overlay {
		color: $gray-700;
		background: #fff;
		border-radius: 8px;
		border: 1px solid $gray-400;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2000;
		overflow-y: scroll;

		form {
			display: flex;
			button {
				width: 60px;
				height: 60px;
				padding: 18px;
				flex-shrink: 0;
			}

			input {
				width: 100%;
				background: none;
				font-size: 18px;
				height: 60px;
			}
		}

		.suggestions {
			border-top: 1px solid $gray-400;
			position: absolute;
			z-index: 999;
			background: #fff;
			left: 0;
			right: 0;
			top: 60px;
			bottom: 0;
			overflow-y: scroll;
			overflow-x: hidden;
			.nox-list-item a {
				&:hover {
					background: $gray-100;
					border-color: transparent;
				}
			}
		}
	}
</style>
