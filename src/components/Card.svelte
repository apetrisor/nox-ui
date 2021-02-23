<script>
	import Image from './Image.svelte';
	export let href;
	export let title;
	export let image;
	export let cover = false;
	export let prefetch = false;
	export let full = false;
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

		&.full
			.image
				bottom: 0
			.meta
				background: linear-gradient(0deg, rgba(0,0,0,0.7), rgba(0,0,0,0))
				border: none
				color: #fff
				position: absolute
				bottom: 0
				left: 0
				right: 0
				transition: height 0.4s, background 0.4s
				font-weight: 500
				font-size: 1.1em
				paddaing: 0.5em
				text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7)
			&:hover
				box-shadow: none
				.meta
					height: 100%
					background: rgba(0,0,0,0.3)
					box-sizing: border-box

	.image
		background: #fff
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

<div class="nox-card" class:full>
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
