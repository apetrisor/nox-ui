<script>
	import {createEventDispatcher} from 'svelte';
	import XIcon from 'svelte-feather-icons/src/icons/XIcon.svelte';

	export let checked;
	export let label;

	const dispatch = createEventDispatcher();

	const handleChange = () => {
		checked = !checked;
		dispatch('change', checked);
	};
</script>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-check-box {
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		.box {
			background: #fff;
			padding: 4px;
			border-radius: 4px;
			width: 30px;
			height: 30px;
			margin-right: 10px;
			transition: box-shadow 0.3s;
		}
		&:hover {
			.box {
				box-shadow: $shadow-md;
			}
		}
	}
</style>

<div class="nox-check-box" on:click={handleChange}>
	<div class="box">
		{#if checked}
			<XIcon />
		{/if}
	</div>
	{#if label}
		<span>{label}</span>
	{/if}
</div>
