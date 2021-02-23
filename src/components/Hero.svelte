<script>
	export let title;
	export let subtitle;
	export let bg = false;
	export let overlay = false;

	let screenWidth = 768;
</script>

<style lang="sass" global>
	@import '../styles/variables'
	.nox-hero
		position: relative
		text-align: center
		padding: 80px 0px
		&.bg
			background-size: cover
			background-position: center
			height: 400px
			@media (min-width: 768px)
				height: 640px

		.overlay
			position: absolute
			z-index: 1
			top: 0
			bottom: 0
			left: 0
			right: 0
			background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.15) 100%)

		h1
			margin-bottom: 10px
		h1, h2
			padding: 0px 20px;

		.content
			margin-top: 40px
			position: relative
			z-index: 2
</style>

<svelte:window bind:innerWidth={screenWidth} />

<div class="nox-hero" class:bg style={bg ? `background-image:url(${screenWidth < 768 ? bg.mobile : bg.desktop})` : null}>
	{#if title}<h1>{title}</h1>{/if}
	{#if subtitle}<h2>{subtitle}</h2>{/if}

	{#if overlay}<div class="overlay" />{/if}

	{#if $$slots.default}
		<div class="content">
			<slot />
		</div>
	{/if}
</div>
