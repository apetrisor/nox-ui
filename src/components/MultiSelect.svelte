<script>
	import {createEventDispatcher} from 'svelte';

	export let options;
	export let placeholder;
	export let selected = [];

	$: currentOptions = options.filter(option => selected.indexOf(option) === -1);
	let selectedOption = '';

	const dispatch = createEventDispatcher();

	const handleChange = e => {
		let val = e.target.value;
		if (val) {
			if (selected.indexOf(val) === -1) {
				selected = [...selected, val];
				dispatch('change', selected);
				selectedOption = '';
			}
		}
	};
</script>

<style lang="scss">
	select {
		opacity: 0;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 10;
		cursor: pointer;
		outline: none;
		appearance: none;
	}
</style>

<select value={selectedOption} on:change={handleChange}>
	<option disabled value="">{placeholder}</option>
	{#each currentOptions as option}
		<option value={option}>{option}</option>
	{/each}
</select>
