<script>
	import SearchBar from './SearchBar.svelte';
	import {fly} from 'svelte/transition';
	import XIcon from 'svelte-feather-icons/src/icons/XIcon.svelte';
	import MenuIcon from 'svelte-feather-icons/src/icons/MenuIcon.svelte';

	export let submenu;
	export let path;
	export let query;
	export let placeholder;

	let mobileMenuOpen = false;
	// When page or query update, close menus
	$: path, query, (mobileMenuOpen = false);
	// When mobile menu changes state, toggle document scrolling
	$: if (process.browser) document.body.style['overflow'] = mobileMenuOpen ? 'hidden' : '';

	const toggleMobileMenu = () => (mobileMenuOpen = !mobileMenuOpen);
</script>

<style lang="scss" global>
	@import '../styles/variables';

	.nox-navbar {
		display: flex;
		border-bottom: 1px solid $gray-200;

		[slot='logo'] {
			height: 36px;
			@include screen-md {
				height: 40px;
			}
		}

		.header {
			height: 64px;
			padding: 10px 0;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.menu-button {
				width: 44px;
				height: 44px;
				padding: 10px;
				margin-right: -10px;
				@include screen-md {
					display: none;
				}
			}
			@include screen-md {
				height: 74px;
				padding: 15px 0;
			}
		}

		.search-bar {
			display: none;
			@include screen-md {
				display: flex;
				justify-content: flex-end;
			}
		}

		.submenu {
			display: none;
			justify-content: space-between;
			margin-bottom: 15px;
			@include screen-md {
				display: flex;
			}
		}

		.mobile-menu {
			position: fixed;
			z-index: 9999;
			top: 64px;
			left: 0;
			right: 0;
			bottom: 0;
			overflow-y: scroll;
			background: #fff;
			@include screen-md {
				display: none;
			}
			.submenu {
				display: flex;
				flex-direction: column;
				a {
					padding: 20px;
					font-size: 1.1rem;
					border-top: 1px solid $gray-200;
				}
			}
		}
	}
</style>

<div class="nox-navbar">
	<div class="container">
		<div class="header">
			<div>
				<a href="/"><slot name="logo">Company Logo</slot></a>
			</div>

			<div class="search-bar">
				<SearchBar small stretch {placeholder} on:search />
			</div>

			<button class="menu-button" on:click={toggleMobileMenu} type="button">
				{#if mobileMenuOpen}
					<XIcon />
				{:else}
					<MenuIcon />
				{/if}
			</button>
		</div>

		{#if submenu}
			<div class="submenu">
				{#each submenu as page}
					<a href={page.path} class:active={page.path === path}>{page.name}</a>
				{/each}
			</div>
		{/if}

		{#if mobileMenuOpen}
			<div transition:fly={{y: -20}} class="mobile-menu">
				<div class="container">
					<SearchBar on:search {placeholder} />
					<div class="submenu">
						{#each submenu as page}
							<a href={page.path} class:active={page.path === path}>{page.name}</a>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>
