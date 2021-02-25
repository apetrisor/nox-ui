<script>
	import SearchBar from './SearchBar.svelte';
	import {fly} from 'svelte/transition';
	import XIcon from 'svelte-feather-icons/src/icons/XIcon.svelte';
	import MenuIcon from 'svelte-feather-icons/src/icons/MenuIcon.svelte';

	export let submenu;
	export let path;
	export let query;
	export let placeholder;
	export let sticky = false;

	let mobileMenuOpen = false;
	// When page or query update, close menus
	$: path, query, (mobileMenuOpen = false);
	// When mobile menu changes state, toggle document scrolling
	$: if (process.browser) document.body.style['overflow'] = mobileMenuOpen ? 'hidden' : '';

	const toggleMobileMenu = () => (mobileMenuOpen = !mobileMenuOpen);

	let screenWidth = 1280;
	let scrollY;

	$: offsetTop = screenWidth < 768 ? 0 : 115;
	$: stuck = scrollY > offsetTop;
</script>

<style lang="scss" global>
	@import '../styles/variables';

	.nox-navbar {
		border-bottom: 1px solid $gray-200;
		background: #fff;
		transition: all 0.3s;
		position: relative;

		&.sticky {
			padding-top: 64px;
			.header {
				position: absolute;
				width: 100%;
				top: 0px;
				z-index: 1000;
			}
			@include screen-md {
				padding-top: 0px;
				margin-top: 74px;
				.header {
					transform: translateY(-74px);
				}
			}
			&.stuck {
				.header {
					position: fixed;
					box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
					transform: translateY(0px);
					border-bottom: 1px solid $gray-200;
				}
			}
		}

		[slot='logo'] {
			height: 36px;
			@include screen-md {
				height: 40px;
			}
		}

		.header {
			height: 64px;
			padding: 10px 0;
			background: #fff;
			transition: transform 0.4s;
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
			margin-bottom: 15px;
			@include screen-md {
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

<svelte:window bind:scrollY bind:innerWidth={screenWidth} />

<div class="nox-navbar" class:sticky class:stuck>
	<div class="header">
		<div class="container">
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
