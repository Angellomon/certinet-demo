<script lang="ts">
	import EmailInput from '../email-input.svelte';
	import PasswordInput from '../password-input.svelte';

	let email = $state('');
	let password = $state('');
</script>

<main class="flex flex-col items-center gap-10">
	<h1 class="text-3xl">Login Empleador</h1>

	<div class="flex max-w-1/2 flex-col items-center gap-3">
		<EmailInput bind:email />

		<PasswordInput bind:password />

		<a href="/empleador" class="self-end">
			<button class="btn btn-secondary">Login</button>
		</a>
	</div>
</main>
