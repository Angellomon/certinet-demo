<script lang="ts">
	import * as v from 'valibot';
	import { User, CreditCard } from 'phosphor-svelte';
	import { formaPagoSchema, type FormaPago } from '$lib/entities';
	import { getCurrentEmpleadorContext } from '$lib/context.svelte';
	import ButtonStripe from '../button-stripe.svelte';

	interface Props {
		onSubmit: (data: FormaPago) => void;
	}

	const { onSubmit }: Props = $props();

	const empleadorStore = getCurrentEmpleadorContext();

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
	{#if empleadorStore.idPagoExterno}
		<button onclick={handleSubmit} class="btn btn-primary">Pagar con Proveedor Externo</button>
	{:else}
		<ButtonStripe idEmpelador={empleadorStore.id} />
	{/if}
</div>
