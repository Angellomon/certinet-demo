<script lang="ts">
	import { getEmpleadorContext } from '$lib/context.svelte';
	import { generateId } from '$lib/demo-data';
	import { X } from 'phosphor-svelte';

	interface Props {
		idEmpelador: string;
	}

	const { idEmpelador }: Props = $props();

	const empleadorStore = getEmpleadorContext(idEmpelador);

	function onclick() {
		(document.getElementById('modal_stripe_id') as any)?.showModal();
	}

	function generatePaymentMethodId() {
		const id = generateId();

		empleadorStore.idPagoExterno = id;
	}
</script>

<button class="btn btn-neutral" {onclick} disabled={!!empleadorStore.idPagoExterno}>
	{#if empleadorStore.idPagoExterno}
		Método ya configurado
	{:else}
		Configurar método de pago
	{/if}
</button>

<dialog id="modal_stripe_id" class="modal">
	<div class="modal-box">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
				<X class="size-5" />
			</button>
		</form>

		<strong>Stripe Setup</strong>
		<p class="text-sm">
			Este setup no es real, simula un proceso con algún proveedor de pagos externo
		</p>
		<p>
			Al hacer click en Continuar se generará un ID aleatorio para simular la configuracion del
			método de pago
		</p>

		<div class="modal-action">
			<form method="dialog">
				<button class="btn" onclick={generatePaymentMethodId}>Continuar</button>
			</form>
		</div>
	</div>
</dialog>
