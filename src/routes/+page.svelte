<script lang="ts">
	type Opinion = {
		opinion: string;
		img: string;
		nombre: string;
		puesto: string;
	};

	const opiniones: Opinion[] = [
		{
			opinion:
				'CertiNet ha transformado nuestra forma de contratar, facilitándonos el acceso a talento altamente calificado en cuestión de minutos',
			img: 'certinet-avatar-1.png',
			nombre: 'Marío López',
			puesto: 'Gerente de Recursos Humanos en Innovatech'
		},
		{
			opinion:
				'Con CertiNet, encontramos expertos en tecnología en un abrir y cerrar de ojos. Su sistema de búsqueda es excepcional',
			img: 'certinet-avatar-2.png',
			nombre: 'Carla Martínez',
			puesto: 'Director de PRoyectos en Innovatech'
		},
		{
			opinion:
				'CertiNet ha transformado nuestra manera de reclutar, haciendo que el proceso sea más rápido y efectivo. ¡Un recurso invaluable!',
			img: 'certinet-avatar-3.png',
			nombre: 'Aaron Torres',
			puesto: 'Gerente de Desarrollo en TechCorp'
		}
	];

	type Funcion = {
		nombre: string;
		funcion: string;
	};

	const funciones: Funcion[] = [
		{
			nombre: 'Descubre el Talento',
			funcion:
				'Accede a una amplia base de datos de profesionales certificados listos para ser contratados, facilitando así la búsqueda de expertos que se adapten a tus necesidades específicas.'
		},
		{
			nombre: 'Personaliza tu Búsqueda',
			funcion:
				'Utiliza nuestros filtros avanzados para encontrar a los candidatos ideales según sus certificaciones, habilidades y experiencia, optimizando tu tiempo de reclutamiento.'
		},
		{
			nombre: 'Facilita el Proceso de Contratación',
			funcion:
				'Aprovecha nuestra plataforma intuitiva que simplifica la comunicación y gestión de candidatos, permitiendo una contratación más ágil y efectiva.'
		},
		{
			nombre: 'Optimiza tus Recursos',
			funcion:
				'Reduce los costos de reclutamiento y el tiempo invertido en la búsqueda de talento, asegurando que cada contratación esté alineada con tus objetivos empresariales.'
		}
	];
</script>

{#snippet mainTitle(title: string)}
	<h1 class="text-3xl font-bold">{title}</h1>
{/snippet}

{#snippet avatar(img: string, nombre: string)}
	<div class="avatar">
		<div class="h-15 w-15 rounded-full">
			<img src={img} alt={nombre} />
		</div>
	</div>
{/snippet}

{#snippet quote(opinion: string)}
	<div class="relative">
		<blockquote class="px-4 py-2">
			{opinion}
		</blockquote>
	</div>
{/snippet}

{#snippet opinion(opinion: Opinion)}
	<div class="my-10 flex flex-row gap-5">
		{@render avatar(opinion.img, opinion.nombre)}

		<div>
			{@render quote(opinion.opinion)}

			<div class="flex flex-col gap-3 sm:flex-row md:items-center">
				<p class="font-bold">{opinion.nombre}</p>
				<p class="text-accent font-bold">({opinion.puesto})</p>
			</div>
		</div>
	</div>
{/snippet}

{#snippet funcion(funcion: Funcion, i: number)}
	<div class="card bg-base-100 shadow-sm sm:max-w-1/2 lg:max-w-1/4">
		<div class="self-center bg-info text-info-content rounded-full w-20 px-7 py-5 text-center text-4xl">{i}</div>

		<div class="card-body items-center text-center">
			<h2 class="card-title">{funcion.nombre}</h2>
			<p>
				{funcion.funcion}
			</p>
			<!-- <div class="card-actions">
				<button class="btn btn-primary">Buy Now</button>
			</div> -->
		</div>
	</div>
{/snippet}

<main class="flex flex-col">
	<div class="bg-base-200 gap-5 px-10 py-5 md:px-20 md:py-10">
		<div class="flex flex-col lg:flex-row">
			<div class="flex flex-col gap-2">
				{@render mainTitle('Conectando el Talento Tecnológico con Oportunidades Clave')}
				<p class="w-[90%]">
					CertiNet revoluciona la búsqueda de talento tecnológico al ofrecer una plataforma
					intuitiva que une a empresas con profesionales certificados. Acelera tu proceso de
					reclutamiento y encuentra a los expertos perfectos para tus proyectos con solo unos clics.
				</p>
				<a class="btn btn-primary w-35" href="/signup">Empieza Ahora</a>

				{@render opinion(opiniones[0])}
			</div>

			<img class="scale-70" src="/certinet-img-1.png" alt="img" />
		</div>
	</div>

	<div class="bg-base-100 flex flex-col justify-center gap-5 px-10 py-5 md:px-20 md:py-10">
		{@render mainTitle('Cómo Funciona CertiNet')}
		<p>Conectando empresas con talento tecnológico certificado de manera eficiente</p>

		<div class="flex flex-row flex-wrap">
			{#each funciones as fn, i}
				{@render funcion(fn, i + 1)}
			{/each}
		</div>
	</div>
</main>

<style lang="postcss">
	@reference "tailwindcss";

	blockquote::before {
		content: open-quote;
		@apply absolute top-0 left-0 text-4xl;
	}

	blockquote::after {
		content: close-quote;
		@apply absolute right-0 bottom-0 text-4xl;
	}
</style>
