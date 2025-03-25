<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/header.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>CertiNet | Acercando Talento</title>
</svelte:head>

<header>
	<Header />
</header>
{@render children()}
