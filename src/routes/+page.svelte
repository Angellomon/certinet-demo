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

	const funciones1: Funcion[] = [
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

	const functiones2: Funcion[] = [
		{
			nombre: 'Descubre Talento Especializado',
			funcion:
				'Accede a nuestra amplia base de datos de profesionales certificados, listos para contribuir a tus proyectos, acelerando tu búsqueda de candidatos ideales.'
		},
		{
			nombre: 'Personaliza tu Búsqueda',
			funcion:
				'Aprovecha herramientas de filtro avanzadas para definir tu búsqueda, asegurando que encuentres exactamente el perfil técnico que tu proyecto necesita.'
		},
		{
			nombre: 'Acelera el Proceso de Selección',
			funcion:
				'Nuestra plataforma te permite gestionar candidatos de manera rápida y sencilla, facilitando decisiones informadas que optimizan tu tiempo y recursos en la contratación.'
		}
	];
</script>

{#snippet mainTitle(title: string)}
	<h1 class="text-3xl font-bold">{title}</h1>
{/snippet}

{#snippet title(title: string)}
	<h1 class="text-2xl font-bold">{title}</h1>
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

{#snippet funcion(funcion: Funcion, i: number, dark = false)}
	<div class:bg-base-200={dark} class="card bg-base-100 shadow-sm sm:max-w-[47%] lg:max-w-[23%] pt-5">
		<div
			class="bg-info text-info-content w-20 self-center rounded-full px-7 py-5 text-center text-4xl"
		>
			{i}
		</div>

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

		<div class="flex flex-row flex-wrap gap-5 justify-center">
			{#each funciones1 as fn, i}
				{@render funcion(fn, i + 1, true)}
			{/each}
		</div>
	</div>

	<div class="bg-base-100 flex flex-col justify-center gap-5 px-10 py-5 md:px-20 md:py-10">
		<div class="flex flex-col gap-10 md:flex-row-reverse">
			<div class="flex flex-col">
				<div class="md:w-2/3">
					{@render title('Transforma la Contratación de Talento Tecnológico')}
				</div>

				<p class="mt-4 font-light">
					CertiNet simplifica la conexión entre empresas y profesionales certificados, optimizando
					tus necesidades de contratación.
				</p>

				<ul class="mt-5 flex list-disc flex-col gap-3 pl-5">
					<li>
						Accede a un amplio pool de talentos calificados listos para aportar en tus proyectos.
					</li>
					<li>
						Utiliza filtros personalizados para encontrar candidatos que cumplen con tus requisitos
						específicos.
					</li>
					<li>
						Facilita la comunicación y gestión de candidatos a través de nuestra plataforma
						intuitiva.
					</li>
					<li>
						Reduce el tiempo y costos de reclutamiento al asegurar contrataciones más efectivas.
					</li>
				</ul>
			</div>

			<div class="bg-base-200 flex items-center justify-center rounded-3xl">
				<figure class="scale-90 p-10">
					<img src="/certinet-img-2.png" alt="img" />
				</figure>
			</div>
		</div>
	</div>

	<div class="bg-base-100 flex flex-col justify-center gap-5 px-10 py-5 md:px-20 md:py-10">
		<div class="flex flex-col gap-10 md:flex-row">
			<div class="flex flex-col md:w-4/5">
				<div class="md:w-2/3">
					{@render title('Optimiza tu Proceso de Contratación con CertiNet')}
				</div>

				<p class="mt-4 font-light">
					Con CertiNet, accede a una solución avanzada que conecta de manera eficiente a empresas en
					búsqueda de profesionales tecnológicos certificados. Encuentra rápidamente a los
					candidatos ideales, reduce los tiempos de selección y asegura que cada contratación cuente
					con la experiencia necesaria.
				</p>

				<ul class="mt-5 flex list-disc flex-col gap-3 pl-5">
					<li>
						Explora un amplio repertorio de talentos altamente calificados para cada proyecto.
					</li>
					<li>
						Aprovecha filtros personalizables que te permiten afinar tu búsqueda según habilidades
						específicas y certificaciones.
					</li>
					<li>
						Facilita el reclutamiento con una plataforma intuitiva que mejora la comunicación y
						gestión de candidatos.
					</li>
					<li>
						Optimiza costos y tiempo, garantizando que cada contratación esté alineada con tus
						objetivos estratégicos.
					</li>
				</ul>
			</div>

			<div class="bg-base-200 flex items-center justify-center rounded-3xl">
				<figure>
					<img src="/certinet-img-3.png" alt="img" />
				</figure>
			</div>
		</div>
	</div>

	<div
		class="bg-base-200 flex flex-col items-center justify-center gap-5 px-10 py-5 md:px-20 md:py-10"
	>
		<div class="text-center">
			{@render mainTitle('Conecta con el Mejor Talento Tecnológico de Manera Eficiente')}
		</div>
		<p class="text-center">
			Optimiza tu proceso de contratación con CertiNet, donde facilitar la conexión entre empresas y
			profesionales certificados se convierte en una experiencia ágil y eficaz.
		</p>

		<div class="flex flex-row flex-wrap gap-10 justify-center">
			{#each functiones2 as fn, i}
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
