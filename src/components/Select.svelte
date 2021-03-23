<script>
	import ChevronDownIcon from 'svelte-feather-icons/src/icons/ChevronDownIcon.svelte';

	export let options = [];
	export let placeholder;
	export let value;
	export let label;

	$: optionsHash = Object.fromEntries(options.map(o => [o.value, o.name]));
</script>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-select {
		display: inline-flex;
		flex-wrap: wrap;
		align-items: center;
		span {
			margin-right: 10px;
		}

		.box {
			background: #fff;
			padding: 10px;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-radius: 4px;
			transition: box-shadow 0.3s;

			&:hover {
				box-shadow: $shadow-md;
			}
		}

		.chevron {
			width: 22px;
			height: 22px;
		}

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
	}
</style>

<div class="nox-select">
	{#if label}
		<span>{label}</span>
	{/if}
	<div class="box">
		<div>{optionsHash[value]}</div>
		<div class="chevron"><ChevronDownIcon /></div>

		<select {value} on:change>
			{#if placeholder}
				<option disabled value="">{placeholder}</option>
			{/if}
			{#each options as option}
				<option value={option.value}>{option.name}</option>
			{/each}
		</select>
	</div>
</div>
