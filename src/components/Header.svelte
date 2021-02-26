<style lang="scss" global>
	@import '../assets/variables';

	.nox-header {
		padding: 50px 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		> div {
			width: 100%;
			&:first-child {
				margin-bottom: 30px;
			}
		}
		h1 {
			letter-spacing: 0.025em;
			font-size: 1.75rem;
			@include screen-sm {
				font-size: 2.25rem;
			}
		}
		p {
			margin-bottom: 20px;
			white-space: pre-wrap;
			&:last-child {
				margin-bottom: 0;
			}
		}
		img {
			max-height: 300px;
			width: 100%;
			object-fit: cover;
		}
		@include screen-lg {
			flex-wrap: nowrap;
			> div {
				width: 48%;
				&:first-child {
					margin-bottom: 0;
				}
			}
		}
	}
</style>

<div class="nox-header">
	<slot />
</div>
