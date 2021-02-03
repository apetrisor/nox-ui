<script>
	export let link;
	export let title;
	export let image;
</script>

<style lang="sass">
	@import 'assets/variables';

	.nox-card
		padding-top: 70%
		position: relative
		overflow: hidden
		border: 1px solid $gray-300
		border-radius: 6px
		transition: box-shadow 0.4s cubic-bezier(0.4, 0, 0, 1)

		.image
			position: absolute
			top: 0
			bottom: 4em
			width: 100%
			padding: 30px

			img, div
				width: 100%
				height: 100%
				transition: transform 0.4s cubic-bezier(0.4, 0, 0, 1)

			img
				object-fit: contain

			div
				background-size: contain
				background-position: center
				background-repeat: no-repeat

		&:hover
			.image
				img, div
					transform: scale3d(1.1, 1.1, 1.1)
			@apply shadow-xl

		.meta
			background: #fff
			padding: 0.5em
			z-index: 20
			position: relative
			display: flex
			align-items: center
			justify-content: center
			line-height: 1.5em
			height: 3em
			box-sizing: content-box
			border-top: 1px solid $gray-300
			.title
				max-height: 100%
				text-align: center
				text-overflow: ellipsis
				overflow: hidden
				display: -webkit-box
				-webkit-line-clamp: 2
				-webkit-box-orient: vertical
</style>

<div class="nox-card">
	<a href={link}>
		<div class="image">
			{#if process.browser && 'objectFit' in document.documentElement.style === false}
				<div style="background-image:url('{image}')" />
			{:else}<img src={image} alt={title} />{/if}
		</div>
		<div class="meta">
			<div class="title">{title}</div>
		</div>
	</a>
</div>
