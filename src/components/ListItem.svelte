<script>
	export let title;
	export let href;
	export let image;
</script>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-list-item > a {
		position: relative;
		display: flex;
		align-items: center;
		padding: 10px;
		border: 1px solid transparent;
		border-radius: 6px;
		transition: all 0.3s;
		&:hover {
			transform: scale3d(1.02, 1.02, 1.02) translateY(-4px);
			z-index: 1;
			border-color: $gray-400;
		}
		.image {
			margin-right: 20px;
			width: 60px;
			flex-shrink: 0;
		}
		.item-info {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>

<div class="nox-list-item">
	<a {href}>
		<div class="image">
			<img src={image} alt={title} />
		</div>
		<div class="item-info">
			<div class="item-title">{title}</div>
			<slot />
		</div>
	</a>
</div>
