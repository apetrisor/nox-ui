<script>
	export let title;
	export let subtitle;
	export let bg = false;
	export let overlay = false;
</script>

<style lang="sass">
	@import '../styles/variables'
	.nox-hero
		position: relative
		text-align: center
		padding: 80px 0px
		h1
			margin-bottom: 20px
		.content
			margin-top: 40px

		.bg-mobile, .bg-desktop
			background-size: cover
			background-position: center
		.bg-mobile
			height: 400px
		.bg-desktop
			height: 640px
			display: none

		@media (min-width: 768px)
			.bg-mobile
				display: none
			.bg-desktop
				display: block
</style>

<div class="nox-hero">
	{#if title}<h1>{title}</h1>{/if}
	{#if subtitle}<h2>{subtitle}</h2>{/if}

	{#if bg}
		<div class="bg-mobile" style="background-image:url({bg.mobile})" />
		<div class="bg-desktop" style="background-image:url({bg.desktop})" />
	{/if}

	{#if $$slots.default}
		<div class="content">
			<slot />
		</div>
	{/if}
</div>
