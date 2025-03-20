<script lang="ts">
	const { onSubmit }: { onSubmit: () => void } = $props();
</script>

<div class="flex flex-col pl-5">
	<label class="input validator w-full grow self-end">
		<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><g
				stroke-linejoin="round"
				stroke-linecap="round"
				stroke-width="2.5"
				fill="none"
				stroke="currentColor"
				><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"
				></circle></g
			></svg
		>
		<input type="input" required placeholder="Nombre Titular" minlength="3" maxlength="30" />
	</label>

	<label class="input validator w-full grow self-end">
		<svg
			class="h-[1em] opacity-50"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
		>
			<path
				d="M3 9H21M7 15H9M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
				stroke="#ffffff"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>

		<input
			type="input"
			required
			placeholder="Número de Tarjeta"
			pattern="[A-Za-z][A-Za-z0-9\-]*"
			minlength="3"
			maxlength="30"
			title="Only letters, numbers or dash"
		/>
	</label>

	<div class="join w-full self-end">
		<label class="input validator">
			<input type="number" required placeholder="Mes" />
		</label>

		<label class="input validator self-end">
			<input type="number" required placeholder="Año" />
		</label>
	</div>

	<button onclick={onSubmit} class="btn btn-secondary">Pagar</button>
	<button onclick={onSubmit} class="btn btn-primary">Pagar con Paypal</button>
</div>
