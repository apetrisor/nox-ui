<script>
	export let breakpoint = 'md';
</script>

<div class="nox-centered {breakpoint}">
	<div>
		<slot />
	</div>
</div>

<style lang="scss" global>
	.nox-centered {
		display: flex;
		flex-direction: column;
		align-items: center;

		> div {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		&.sm > div {
			@screen sm {
				align-items: flex-start;
			}
		}

		&.md > div {
			@screen md {
				align-items: flex-start;
			}
		}

		&.lg > div {
			@screen lg {
				align-items: flex-start;
			}
		}
		&.xl > div {
			@screen xl {
				align-items: flex-start;
			}
		}
	}
</style>
