<script>
	import Image from './Image.svelte';
	export let bg = false;
	export let overlay = false;
	export let boxed = false;
	export let bgColor = false;

	let className = '';
	export {className as class};
</script>

<div class="nox-hero {className} {bgColor ? bgColor : ''}" class:bg>
	{#if bg}
		<div class="bg-image">
			{#if overlay}<div class="overlay" />{/if}
			<div class="desktop">
				<Image fit="cover" src={bg.desktop || bg.mobile} alt={bg.alt} />
			</div>
			<div class="mobile">
				<Image fit="cover" src={bg.mobile || bg.desktop} alt={bg.alt} />
			</div>
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

<style lang="scss" global>
	@import '../assets/variables';

	.nox-hero {
		position: relative;
		text-align: center;
		padding: 80px 0px;
		&.bg {
			height: 400px;
			.bg-image {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				width: 100%;
				height: 100%;
				z-index: 0;
				> div {
					width: 100%;
					height: 100%;
				}
				.desktop {
					display: none;
					@screen lg {
						display: block;
					}
				}
				.mobile {
					@screen lg {
						display: none;
					}
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

		.container {
			position: relative;
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
