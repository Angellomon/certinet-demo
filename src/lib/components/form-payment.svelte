<script lang="ts">
	import * as v from 'valibot';
	import CreditCardSvg from './credit-card-svg.svelte';
	import UserSvg from './user-svg.svelte';

	interface Props {
		onSubmit: (data: FormData) => void;
		monto: number;
	}

	const { onSubmit, monto }: Props = $props();

	const formSchema = v.object({
		nombreTitular: v.string(),
		tarjeta: v.string(),
		cvc: v.string(),
		mes: v.number(),
		año: v.number()
	});
	type FormData = v.InferOutput<typeof formSchema>;

	let errors = $state (false)

	const formDataState: FormData = $state({
		cvc: '',
		nombreTitular: '',
		tarjeta: '',
		año: 2025,
		mes: 1
	});

	function handleSubmit() {
		try {

			const data = v.parse(formSchema, formDataState);
			onSubmit(data)
		} catch(e) {

			errors = true
		}
	}
</script>

<p class="pl-5 text-xl">Monto: ${monto.toFixed(2)}</p>

<div class="flex flex-col pl-5">
	<label class="input validator w-full grow self-end">
		<UserSvg />
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
		<CreditCardSvg />

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
