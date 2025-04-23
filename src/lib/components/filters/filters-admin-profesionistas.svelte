<script lang="ts">
	import { BooleanFilter, type Filter } from '$lib/filters.svelte';
	import { X } from 'phosphor-svelte';

	interface Props {
		onSelect?(filterType: Filter): void;
		onClose?(): void;
	}

	const { onSelect = () => {}, onClose = () => {} }: Props = $props();

	function createStatusFilter(value: boolean = false) {
		onSelect(new BooleanFilter('Estatus Verificación', value));
	}

	function handleClose() {
		onClose();
	}
</script>

<ul class="list bg-base-200 rounded-box border-base-content relative w-72 border shadow-md">
	<div class="absolute top-1 right-1">
		<button class="btn tooltip tooltip-left" data-tip="Cerrar Filtros" onclick={handleClose}>
			<X class="h-5" />
		</button>
	</div>

	<li class="p-4 pb-2 text-xs tracking-wide">Filtros</li>

	<li class="list-row items-center gap-5">
		<div class="flex flex-col gap-2">
			<strong>Estatus</strong>

			<div class="join gap-2">
				<button class="btn btn-neutral" onclick={() => createStatusFilter(false)}>
					<pre>Verificación</pre>
				</button>
			</div>
		</div>
	</li>
</ul>
