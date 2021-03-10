<script>
	import Image from './Image.svelte';
	export let bg = false;
	export let overlay = false;
	export let boxed = false;
	export let bgColor = false;

	let className = '';
	export {className as class};
</script>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-hero {
		position: relative;
		text-align: center;
		padding: 80px 0px;
		&.bg {
			height: 400px;
			overflow: hidden;
			.bg-image {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				width: 100%;
				height: 100%;
				div {
					width: 100%;
					height: 100%;
					background-size: cover;
					background-position: center;
					background-repeat: no-repeat;
				}
			}

			@screen sm {
				height: 520px;
			}
			@screen md {
				height: 640px;
			}
		}
		&.gray {
			background-color: $gray-200;
		}
		&.pink {
			background-color: $pink-100;
		}
		&.cream {
			background-color: $cream-300;
		}
		&.purple {
			background-color: $purple-200;
		}
		&.teal {
			background-color: $teal-200;
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

		h1,
		h2 {
			margin-bottom: 10px;
		}

		p {
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
			@screen md {
				padding: 40px;
			}
		}

		div [slot='content'] {
			margin-top: 40px;
		}
	}
</style>

<div class="nox-hero {className} {bgColor ? bgColor : ''}" class:bg>
	{#if overlay}<div class="overlay" />{/if}
	{#if bg}
		<div class="bg-image hidden lg:block">
			{#if process.browser && 'objectFit' in document.documentElement.style === false}
				<div style="background-image:url('{bg.desktop || bg.mobile}')" />
			{:else}
				<Image slow fit="cover" src={bg.desktop || bg.mobile} />
			{/if}
		</div>
		<div class="bg-image lg:hidden">
			{#if process.browser && 'objectFit' in document.documentElement.style === false}
				<div style="background-image:url('{bg.mobile || bg.desktop}')" />
			{:else}
				<Image slow fit="cover" src={bg.mobile || bg.desktop} />
			{/if}
		</div>
	{/if}
	<div class="container">
		{#if boxed}
			<div class="box"><slot /></div>
		{:else}
			<slot />
		{/if}

		<slot name="content" />
	</div>
</div>
