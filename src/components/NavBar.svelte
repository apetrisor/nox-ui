<script>
	import SearchOverlay from './SearchOverlay.svelte';
	import SearchBar from './SearchBar.svelte';
	import {fly} from 'svelte/transition';
	import XIcon from 'svelte-feather-icons/src/icons/XIcon.svelte';
	import MenuIcon from 'svelte-feather-icons/src/icons/MenuIcon.svelte';
	import SearchIcon from 'svelte-feather-icons/src/icons/SearchIcon.svelte';

	export let submenu;
	export let path;
	export let query;
	export let placeholder;
	export let sticky = false;
	export let autocomplete;

	let searchOverlayVisible = false;

	let mobileMenuOpen = false;
	// When page or query update, close menus
	$: path, query, (mobileMenuOpen = false);
	// When mobile menu changes state, toggle document scrolling
	$: if (process.browser) document.body.style['overflow'] = mobileMenuOpen ? 'hidden' : '';

	const toggleMobileMenu = () => (mobileMenuOpen = !mobileMenuOpen);

	let scrollY;
	$: stuck = scrollY > 60;
</script>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-navbar {
		transition: all 0.3s;
		position: relative;
		.inner {
			border-bottom: 1px solid $gray-200;
			background: #fff;
		}

		&.sticky {
			height: 64px;
			.inner {
				height: 64px;
				position: fixed;
				width: 100%;
				top: 0px;
				z-index: 1000;
				transition: height 0.3s, box-shadow 0.3s;
				.submenu {
					transition: all 0.3s;
				}
			}

			&.stuck {
				.inner {
					box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
					.submenu {
						visibility: hidden;
						opacity: 0;
					}
				}
			}

			@screen md {
				height: 104px;
				.inner {
					height: 104px;
				}
				&.stuck .inner {
					height: 64px;
				}
			}
		}

		[slot='logo'] {
			height: 24px;
			@screen md {
				height: 26px;
			}
		}

		.header {
			padding: 10px 0;
			.container {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.menu-button {
				width: 44px;
				height: 44px;
				padding: 10px;
				margin-right: -10px;
			}
			@screen md {
				padding: 13px 0;
				.menu-button {
					display: none;
				}
			}
		}

		.search-bar {
			display: none;
			@screen md {
				display: block;
			}
		}

		.submenu {
			display: none;
			padding-bottom: 15px;
			@screen md {
				display: block;
			}
			.container {
				display: flex;
				justify-content: space-between;
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
			padding: 20px 0;
			@screen md {
				display: none;
			}
			.submenu {
				display: flex;
				flex-direction: column;
				a {
					padding: 20px;
					font-size: 1.1rem;
					border-bottom: 1px solid $gray-200;
				}
			}
		}
	}
</style>

<svelte:window bind:scrollY />

<div class="nox-navbar" class:sticky class:stuck>
	<div class="inner">
		<div class="header">
			<div class="container">
				<button class="menu-button" on:click={toggleMobileMenu} type="button">
					{#if mobileMenuOpen}
						<XIcon />
					{:else}
						<MenuIcon />
					{/if}
				</button>

				<div>
					<a href="/"><slot name="logo">Company Logo</slot></a>
				</div>

				<div class="search-bar">
					<SearchBar {autocomplete} size="tiny" stretch {placeholder} value={query.q} on:search />
				</div>
				<button class="menu-button" type="button" on:click={() => (searchOverlayVisible = true)}>
					<SearchIcon />
				</button>
			</div>
		</div>

		{#if submenu}
			<div class="submenu">
				<div class="container">
					{#each submenu as page}
						<a href={page.path} class:active={page.path === path}>{page.name}</a>
					{/each}
				</div>
			</div>
		{/if}
		{#if searchOverlayVisible}
			<SearchOverlay on:close={() => (searchOverlayVisible = false)} on:search {placeholder} value={query.q} {autocomplete} />
		{/if}
	</div>

	{#if mobileMenuOpen}
		<div transition:fly={{y: -20, duration: 400}} class="mobile-menu">
			<div class="container">
				<div class="submenu">
					{#each submenu as page}
						<a href={page.path} class:active={page.path === path}>{page.name}</a>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>
