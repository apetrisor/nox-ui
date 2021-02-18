<script>
	import Image from './Image.svelte';
	export let href;
	export let title;
	export let image;
	export let cover = false;
	export let prefetch = false;
</script>

<style lang="sass">
	@import '../styles/variables'
	.nox-card
		padding-top: 100%
		position: relative
		overflow: hidden
		border: 1px solid $gray-200
		border-radius: 6px
		transition: box-shadow $cubic-ease
		&:hover
			box-shadow: $shadow-xl
			.image
				transform: scale3d(1.1, 1.1, 1.1)

	.image
		position: absolute
		top: 0
		bottom: 4em
		width: 100%
		box-sizing: border-box
		transition: transform $cubic-ease

		div
			width: 100%
			height: 100%
			background-size: contain
			background-position: center
			background-repeat: no-repeat

		&.cover
			div
				background-size: cover

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
		border-top: 1px solid $gray-200

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
	<a {href} rel={prefetch ? 'prefetch' : ''}>
		<div class="image" class:cover>
			{#if process.browser && 'objectFit' in document.documentElement.style === false}
				<div style="background-image:url('{image}')" />
			{:else}
				<Image src={image} alt={title} fit={cover ? 'cover' : 'contain'} />
			{/if}
		</div>
		<div class="meta">
			<div class="title">{title}</div>
		</div>
	</a>
</div>
