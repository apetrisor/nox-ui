<script>
	export let bg = false;
	export let overlay = false;
	export let boxed = false;

	let screenWidth = 768;
</script>

<style lang="scss" global>
	@import '../styles/variables';

	.nox-hero {
		position: relative;
		text-align: center;
		padding: 80px 0px;
		&.bg {
			background-size: cover;
			background-position: center;
			height: 400px;
			@media (min-width: 768px) {
				height: 640px;
			}
		}

		.overlay {
			position: absolute;
			z-index: 1;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.15) 100%);
		}

		h1 {
			margin-bottom: 10px;
		}

		h2 {
			line-height: 1.5em;
			margin-bottom: 20px;
		}

		.container {
			position: relative;
			z-index: 2;
		}

		.box {
			background: #fff;
			padding: 20px;
			margin: 0px auto;
			box-shadow: $shadow-xl;
			max-width: 500px;
			border-radius: 6px;
			@include screen-md {
				padding: 40px;
			}
		}

		div [slot='content'] {
			margin-top: 40px;
		}
	}
</style>

<svelte:window bind:innerWidth={screenWidth} />

<div class="nox-hero" class:bg style={bg ? `background-image:url(${screenWidth < 768 ? bg.mobile : bg.desktop})` : null}>
	{#if overlay}<div class="overlay" />{/if}

	<div class="container">
		{#if boxed}
			<div class="box"><slot /></div>
		{:else}
			<slot />
		{/if}

		<slot name="content" />
	</div>
</div>
