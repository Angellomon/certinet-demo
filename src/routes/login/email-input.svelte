<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	let { email = $bindable('') } = $props();

	const updateEmail: ChangeEventHandler<HTMLInputElement> = (e) => {
		email = e.currentTarget.value;
	};
</script>

<div>
	<label class="input validator">
		<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><g
				stroke-linejoin="round"
				stroke-linecap="round"
				stroke-width="2.5"
				fill="none"
				stroke="currentColor"
				><rect width="20" height="16" x="2" y="4" rx="2"></rect><path
					d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
				></path></g
			></svg
		>
		<input onchange={updateEmail} type="email" placeholder="mail@site.com" required />
	</label>
	<div class="validator-hint hidden">Enter valid email address</div>
</div>
