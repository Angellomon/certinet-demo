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

		<button class="btn btn-primary inline self-end" onclick={() => console.log(email)}>Login</button>
	</div>
</main>
