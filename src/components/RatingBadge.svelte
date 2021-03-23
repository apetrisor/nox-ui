<script>
	import FaStar from 'svelte-icons/fa/FaStar.svelte';
	export let score;
</script>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-rating-badge {
		color: #fff;
		font-weight: 500;
		background: $yellow-500;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.3rem;
		border-radius: 6px;
		min-width: 4rem;
		svg {
			width: 1rem;
			height: 1rem;
			margin-right: 0.3rem;
		}
	}
</style>

<div class="nox-rating-badge">
	<FaStar />{score}
</div>
