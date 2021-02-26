<script>
	export let content;
	export let top = false;
	export let bottom = false;
	export let width = undefined;

	let style = '';
	if (width) style = `width: ${width}`;
</script>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-tooltip {
		position: relative;
		display: inline-block;
		cursor: pointer;
		&:hover {
			.content {
				opacity: 1;
				visibility: visible;
			}
			.top {
				transform: translate3d(-50%, -80%, 0);
			}
			.bottom {
				transform: translate3d(-50%, 80%, 0);
			}
		}

		.content {
			position: absolute;
			visibility: hidden;
			opacity: 0;
			transform: translate3d(-50%, 0px, 0px);
			padding: 15px;
			background: #fff;
			transition: all 0.3s cubic-bezier(0.4, 0, 0, 1);
			width: 300px;
			max-width: 100vh;
			text-align: center;
			border-radius: 6px;
			pointer-events: none;
			box-shadow: $shadow-2xl;
			font-size: 0.875rem;
			&.top {
				top: 0;
				left: 50%;
			}
			&.bottom {
				bottom: 0;
				left: 50%;
			}
		}
	}
</style>

<div class="nox-tooltip">
	<slot />
	<div class="content" class:top class:bottom {style}>{content}</div>
</div>
