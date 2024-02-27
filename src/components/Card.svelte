<script>
	import Image from './Image.svelte';
	export let href;
	export let title;
	export let image;
	export let fit = 'contain';
	export let full = false;
</script>

<div class="nox-card" class:full>
	<a class="image-wrapper" {href}>
		<div class="image">
			<Image src={image} alt={title} {fit} {...$$restProps} />
		</div>
	</a>
	<div class="meta">
		<a class="title-wrapper" {href}>
			<div class="title">{title}</div>
		</a>
		<slot />
	</div>
</div>

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
			cursor: pointer;
			.meta {
				justify-content: flex-end;
				background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
				border: none;
				color: #fff;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 50%;
				transition: all 0.4s;
				font-weight: 500;
				font-size: 1.1em;
				text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
				.title-wrapper {
					transition: all 0.4s;
				}
			}
			&:hover {
				box-shadow: none;
				.meta {
					height: 100%;
					.title-wrapper {
						height: 100%;
						color: #fff;
					}
				}
			}
		}

		.image-wrapper {
			display: block;
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
			display: flex;
			flex-direction: column;
			background: #fff;
			padding: 0.5em;
			line-height: 1.5em;
			border-top: 1px solid $gray-200;
		}

		.title-wrapper {
			height: 3em;
			display: flex;
			align-items: center;
			justify-content: center;
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
