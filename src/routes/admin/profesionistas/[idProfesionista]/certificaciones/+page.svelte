<script lang="ts">
	import { page } from '$app/state';
	import TableCertificaciones from '$lib/components/table-certificaciones.svelte';

	const { idProfesionista } = page.params;
</script>

<main class="flex flex-col gap-5">
	<TableCertificaciones {idProfesionista} showVerifyActions />
</main>
