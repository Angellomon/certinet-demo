<script lang="ts">
	import type { Certificacion } from '$lib/entities';
	import CountStat from './count-stat.svelte';
	import VerifiedStatus from './verified-status.svelte';

	const { certificaciones } = $props<{ certificaciones: Certificacion[] }>();
</script>

{#snippet statVigencia(title: string, value: string)}
	<div class="mx-5 flex flex-col items-start justify-center">
		<span class="text-md font-extralight">{title}</span>
		<span class="text-lg font-bold">{value}</span>
	</div>
{/snippet}

<ul class="list bg-base-100 rounded-box gap-1 shadow-md">
	{#each certificaciones as cert}
		<a href={`/profesionista/certificaciones/${cert.id}`}>
			<li class="list-row my-1 hover:border">
				<div class="flex flex-col">
					<h3 class="text-xl font-bold hover:font-bold">{cert.nombre}</h3>
					<div class="flex flex-col justify-between md:flex-row">
						{#if cert.vigencia < 0}
							{@render statVigencia('Vigencia', 'Vitalicia')}
						{:else}
							{@render statVigencia(
								'Vigencia',
								`${cert.vigencia} año${cert.vigencia > 1 ? 's' : ''}`
							)}
						{/if}

						<VerifiedStatus verified={cert.verificado}
							>{cert.verificado ? 'Verificado' : 'Verificación Pendiente'}</VerifiedStatus
						>
					</div>
				</div>
			</li>
		</a>
	{/each}
</ul>
