<script>
	export let title;
	export let subtitle;
</script>

<style lang="sass">
	@import '../styles/variables'
	.nox-hero
		text-align: center
		padding: 80px 0px
		h1
			margin-bottom: 20px
		.content
			margin-top: 40px
</style>

<div class="nox-hero">
	<h1>{title}</h1>
	{#if subtitle}
		<h2>{subtitle}</h2>
	{/if}
	{#if $$slots.default}
		<div class="content">
			<slot />
		</div>
	{/if}
</div>
