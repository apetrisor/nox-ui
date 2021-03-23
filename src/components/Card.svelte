<script>
	import Image from './Image.svelte';
	export let href;
	export let title;
	export let image;
	export let fit = 'contain';
	export let prefetch = false;
	export let full = false;
</script>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-card {
		position: relative;
		overflow: hidden;
		border: 1px solid $gray-200;
		border-radius: 6px;
		transition: box-shadow $cubic-ease;
		&:hover {
			box-shadow: $shadow-xl;
			.image {
				transform: scale3d(1.1, 1.1, 1.1);
			}
		}

		&.full {
			.image {
				bottom: 0;
			}
			.meta {
				background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
				border: none;
				color: #fff;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				transition: height 0.4s, background 0.4s;
				font-weight: 500;
				font-size: 1.1em;
				padding: 0.5em;
				text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
			}
			&:hover {
				box-shadow: none;
				.meta {
					height: 100%;
					background: rgba(0, 0, 0, 0.3);
					box-sizing: border-box;
				}
			}
		}

		.image-wrapper {
			position: relative;
			padding-top: 100%;
			overflow: hidden;
		}

		.image {
			background: #fff;
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			transition: transform $cubic-ease;
		}

		.meta {
			background: #fff;
			padding: 0.5em;
			line-height: 1.5em;
			box-sizing: content-box;
			border-top: 1px solid $gray-200;
		}

		.title-wrapper {
			height: 3em;
			display: flex;
			align-items: center;
			justify-content: center;
			box-sizing: content-box;
		}

		.title {
			max-height: 100%;
			text-align: center;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}
	}
</style>

<div class="nox-card" class:full>
	<div class="image-wrapper">
		<a {href} rel={prefetch ? 'prefetch' : ''}>
			<div class="image">
				<Image src={image} alt={title} {fit} />
			</div>
		</a>
	</div>
	<div class="meta">
		<a {href} rel={prefetch ? 'prefetch' : ''}>
			<div class="title-wrapper">
				<div class="title">{title}</div>
			</div>
		</a>
		<slot />
	</div>
</div>
