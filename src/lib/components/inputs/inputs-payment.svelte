<script lang="ts">
	import * as v from 'valibot';
	import { User, CreditCard } from 'phosphor-svelte';
	import { formaPagoSchema, type FormaPago } from '$lib/entities';

	interface Props {
		onSubmit: (data: FormaPago) => void;
	}

	const { onSubmit }: Props = $props();

	const formSchema = formaPagoSchema;
	type FormData = v.InferOutput<typeof formSchema>;

	let errors = $state(false);

	const formDataState: FormData = $state({
		cvc: '',
		nombreTitular: '',
		tarjeta: '',
		año: 2025,
		mes: 1,
		verificado: false
	});

	function handleSubmit() {
		try {
			let data = v.parse(formSchema, formDataState);
			data = v.parse(formaPagoSchema, data);
			onSubmit(data);
		} catch (e) {
			console.log(e);

			errors = true;
		}
	}

	$inspect(errors);
</script>

<div class="flex flex-col pl-5">
	<label class="input validator w-full grow self-end">
		<User class="size-5" />
		<input
			type="input"
			required
			placeholder="Nombre Titular"
			minlength="3"
			maxlength="30"
			bind:value={formDataState.nombreTitular}
		/>
	</label>

	<label class="input validator w-full grow self-end">
		<CreditCard class="size-5" />

		<input
			type="input"
			required
			placeholder="Número de Tarjeta"
			pattern="[0-9\-]*"
			minlength="3"
			maxlength="30"
			title="Only letters, numbers or dash"
			bind:value={formDataState.tarjeta}
		/>
	</label>

	<div class="join w-full self-end">
		<label class="input validator">
			<input type="number" required placeholder="Mes" bind:value={formDataState.mes} />
		</label>

		<label class="input validator self-end">
			<input type="number" required placeholder="Año" bind:value={formDataState.año} />
		</label>
	</div>

	<button onclick={handleSubmit} class="btn btn-secondary">Pagar</button>
	<button onclick={handleSubmit} class="btn btn-primary">Pagar con Paypal</button>
</div>
