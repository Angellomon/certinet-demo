<script lang="ts">
	import EmailInput from "../email-input.svelte";
	import PasswordInput from "../password-input.svelte";

	let email = $state("")
	let password = $state("")

</script>

<main class="flex flex-col items-center gap-10">
	<h1 class="text-3xl">Login Profesionista</h1>

	<div class="flex flex-col gap-3 items-center max-w-1/2">
		<EmailInput bind:email />

		<PasswordInput bind:password />

		<a href="/profesionista" class="self-end">
			<button class="btn btn-primary">Login</button>
		</a>
	</div>
</main>
