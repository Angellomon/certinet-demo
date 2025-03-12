<script lang="ts">
	import ListaCertificaciones from '$lib/components/lista-certificaciones.svelte';

  const { data } = $props()

  const { certificaciones } = data
</script>

<main>
  <h1 class="text-xl">Resultados de Búsqueda</h1>

  <ListaCertificaciones basePath="/empleador/certificaciones" {certificaciones} />
</main>

