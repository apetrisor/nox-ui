<script>
	export let link;
	export let title;
	export let image;
</script>

<style lang="sass">
	@import '../styles/variables'
	.nox-card
		padding-top: 70%
		position: relative
		overflow: hidden
		border: 1px solid $gray-light
		border-radius: 6px
		transition: box-shadow $cubic-ease

		.image
			position: absolute
			top: 0
			bottom: 4em
			width: 100%
			padding: 30px

			img, div
				width: 100%
				height: 100%
				transition: transform $cubic-ease

			img
				object-fit: contain

			div
				background-size: contain
				background-position: center
				background-repeat: no-repeat

		&:hover
			box-shadow: $shadow-big
			.image
				img, div
					transform: scale3d(1.1, 1.1, 1.1)

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
			border-top: 1px solid $gray-light
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
