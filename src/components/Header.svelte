<style lang="scss" global>
	.nox-header {
		padding: 50px 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		> div {
			width: 100%;
		}
		h1 {
			letter-spacing: 0.025em;
			font-size: 1.75rem;
			@screen md {
				font-size: 2.25rem;
			}
		}
		p {
			font-size: 0.875rem;
			margin-bottom: 30px;
			white-space: pre-wrap;
		}
		img {
			max-height: 300px;
			width: 100%;
			object-fit: cover;
		}
		@screen lg {
			flex-wrap: nowrap;
			> div {
				width: 48%;
			}
			p {
				margin-bottom: 0;
			}
		}
	}
</style>

<div class="nox-header">
	<slot />
</div>
