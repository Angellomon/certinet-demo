<script lang="ts">
	import EmailInput from '../email-input.svelte';
	import PasswordInput from '../password-input.svelte';

	let email = $state('');
	let password = $state('');
</script>

<main class="my-30 flex flex-col items-center gap-10">
	<h1 class="text-3xl">Login Admin</h1>

	<div class="flex max-w-1/2 flex-col items-center gap-3">
		<EmailInput bind:email />

		<PasswordInput bind:password />

		<a class="btn btn-neutral btn-block" href="/admin">Login</a>
	</div>
</main>
