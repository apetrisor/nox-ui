<script>
	import MailIcon from 'svelte-feather-icons/src/icons/MailIcon.svelte';
	import CheckCircleIcon from 'svelte-feather-icons/src/icons/CheckCircleIcon.svelte';
	import XIcon from 'svelte-feather-icons/src/icons/XIcon.svelte';
	import {createEventDispatcher, onMount} from 'svelte';
	import {fly} from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let email = '';
	export let placeholder = 'your email';
	export let endpoint;
	export let id = null;

	$: storeName = 'emailSubscribe' + (id ? `-${id}` : '');

	let subscribed = false;
	let loading = false;
	let error = null;

	onMount(() => {
		if (localStorage && localStorage.getItem(storeName)) {
			subscribed = true;
		}
	});

	// Check if email looks like a real email
	const isValidEmail = str => {
		return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(str);
	};

	const handleSubmit = async () => {
		if (!isValidEmail(email)) return (error = 'Invalid email.');

		error = null;
		loading = true;

		const response = await fetch(endpoint, {method: 'POST', body: JSON.stringify({email})});

		loading = false;
		if (!response.ok) {
			let res = await response.json();
			return (error = res.message || 'Subscription failed. Please try again later.');
		}

		subscribed = true;
		if (localStorage) localStorage.setItem(storeName, true);

		dispatch('subscribe', email);
	};

	const handleReset = () => {
		if (localStorage) localStorage.removeItem(storeName);
		subscribed = false;
	};
</script>

<div class="nox-email-subscribe" class:error>
	{#if !subscribed}
		<form on:submit|preventDefault={handleSubmit}>
			<MailIcon size="24" class="mx-3" />
			<input {placeholder} bind:value={email} />
			<slot name="button">
				<button type="submit" title={placeholder}>Join</button>
			</slot>
		</form>
		{#if error}
			<div transition:fly={{y: 20, duration: 400}} class="error">{error}</div>
		{/if}
	{:else}
		<div class="success">
			<div class="success-message">
				<CheckCircleIcon size="24" class="mx-3" />Subscribed!
			</div>
			<button class="reset" on:click={handleReset}><XIcon /></button>
		</div>
	{/if}
</div>

<style lang="scss" global>
	@import '../assets/variables';

	.nox-email-subscribe {
		width: 100%;
		max-width: 300px;
		color: $gray-700;
		form {
			background: #fff;
			border-radius: 8px;
			display: flex;
			align-items: center;
			justify-content: center;
			input {
				width: 100%;
				background: none;
				font-size: 16px;
			}
		}
		&.error form {
			background: $pink-100;
		}
		.error {
			margin-top: 10px;
			color: $red-400;
		}
		.success {
			background: $green-400;
			font-weight: 600;
			border-radius: 8px;
			display: flex;
			align-items: center;
			justify-content: space-between;

			color: white;
			.success-message {
				display: flex;
			}
			.reset {
				padding: 12px;
			}
		}
	}
</style>
