<script lang="ts">
	import { page } from "$app/state";
	import TableProcesosContacto from "$lib/components/tables/table-procesos-contacto.svelte";

  const { idEmpleador } = page.params

</script>

<main class="flex flex-col gap-5">
  <TableProcesosContacto {idEmpleador} />
</main>