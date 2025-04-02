<script lang="ts">
</script>

{#snippet mainTitle(title: string)}
	<h1 class="text-3xl font-bold">{title}</h1>
{/snippet}

<main class="flex flex-col gap-5 px-10 py-5 md:px-20 md:py-10">
	<div class="flex flex-col lg:flex-row">
		<div class="flex flex-col gap-2">
			{@render mainTitle('Conectando el Talento Tecnológico con Oportunidades Clave')}
			<p class="w-[90%]">
				CertiNet revoluciona la búsqueda de talento tecnológico al ofrecer una plataforma intuitiva
				que une a empresas con profesionales certificados. Acelera tu proceso de reclutamiento y
				encuentra a los expertos perfectos para tus proyectos con solo unos clics.
			</p>
			<a class="btn btn-primary w-35" href="/signup">Empieza Ahora</a>
		</div>

		<img class="scale-70" src="/certinet-img-1.png" alt="img" />
	</div>
</main>
