<script lang="ts">
	import ArrowSvg from '$lib/components/arrow-svg.svelte';

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
			puesto: 'Director de Proyectos en Innovatech'
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

	type Plan = {
		nombre: string;
		descripcion: string;
		precio: number;
		caracteristicas: string[];
	};

	const planes: Plan[] = [
		{
			nombre: 'Básico',
			descripcion:
				'Accede a nuestra plataforma con un plan gratuito por 14 días. Sin compromisos. Encuentra candidatos ideales y optimiza tu proceso de contratación.',
			precio: 0,
			caracteristicas: [
				'5,000 usuarios',
				'Proyectos ilimitados',
				'Todos los tipos de proyectos',
				'Integraciones ilimitadas',
				'Compartición avanzada',
				'Pruebas A/B de proyectos',
				'Almacenamiento ilimitado'
			]
		},
		{
			nombre: 'Empresarial',
			descripcion:
				'Después de tu prueba gratuita de 14 días, accede de manera continua a talento tecnológico especializado. Sin ataduras, solo resultados.',
			precio: 20,
			caracteristicas: [
				'15,000 usuarios',
				'Proyectos ilimitados',
				'Todos los tipos de proyectos',
				'Integraciones ilimitadas',
				'Compartición avanzada',
				'Pruebas A/B de proyectos',
				'Almacenamiento ilimitado'
			]
		},
		{
			nombre: 'Enterprise',
			descripcion:
				'Inicia tu prueba gratuita de 14 días y descubre la flexibilidad de acceder a recursos ilimitados. Cancelación en cualquier momento.',
			precio: 99,
			caracteristicas: [
				'Usuarios ilimitados',
				'Proyectos ilimitados',
				'Todos los tipos de proyectos',
				'Integraciones ilimitadas',
				'Compartición avanzada',
				'Pruebas A/B de proyectos',
				'Almacenamiento ilimitado'
			]
		}
	];

	type Insight = {
		img: string;
		titulo: string;
		fecha: string;
		contenido: string;
	};

	const insights: Insight[] = [
		{
			contenido:
				'Aprende estrategias efectivas para mejorar tus iniciativas de integración de datos, asegurando a la vez la seguridad y el acceso sencillo a la información crítica.',
			fecha: '15 FEB 2023',
			img: 'certinet-card-img-1.png',
			titulo: 'Optimizando Tu Estrategia de Integración de Datos'
		},
		{
			contenido:
				'Explora cómo las herramientas de colaboración en la nube pueden transformar la productividad de tu equipo y mejorar el acceso a datos críticos.',
			fecha: '20 FEB 2023',
			img: 'certinet-card-img-2.png',
			titulo: 'Maximizando la Colaboración en la Nube'
		},
		{
			contenido:
				'Descubre estrategias clave para proteger tus datos en un entorno interconectado, optimizando la usabilidad al mismo tiempo.',
			fecha: '25 FEB 2023',
			img: 'certinet-card-img-3.png',
			titulo: 'Asegurando tus Datos en un Mundo Digital'
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
	<div
		class:bg-base-200={dark}
		class="card bg-base-100 pt-5 shadow-sm sm:max-w-[47%] lg:max-w-[23%]"
	>
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

{#snippet plan(plan: Plan)}
	<div
		class="card bg-base-300 items-center justify-center px-5 py-5 shadow-sm sm:max-w-[47%] lg:max-w-[30%]"
	>
		<h3 class="my-2 text-center text-2xl font-bold">{plan.nombre}</h3>
		<p class="text-center">{plan.descripcion}</p>

		<div class="text-base-content mt-8 text-center text-5xl font-bold">${plan.precio}</div>
		<p class="mb-5 text-center font-extralight uppercase">Prueba gratuita de 14 días</p>

		<button class="btn btn-neutral mb-5 w-55 uppercase">Seleccionar este plan</button>

		<ul class="flex flex-col gap-1">
			{#each plan.caracteristicas as caracteristica}
				<li class="flex flex-row items-center gap-2"><ArrowSvg /> {caracteristica}</li>
			{/each}
		</ul>
	</div>
{/snippet}

{#snippet planDestacado(plan: Plan)}
	<div
		class="card bg-info-content items-center justify-center px-5 py-5 text-white shadow-sm sm:max-w-[47%] lg:max-w-[30%]"
	>
		<h3 class="my-2 text-center text-2xl font-bold">{plan.nombre}</h3>
		<p class="text-center">{plan.descripcion}</p>

		<div class="mt-8 text-center text-5xl font-bold text-white">${plan.precio}</div>
		<p class="mb-5 text-center font-extralight uppercase">Prueba gratuita de 14 días</p>

		<button class="btn btn-neutral mb-5 w-55 uppercase">Seleccionar este plan</button>

		<ul class="flex flex-col gap-1">
			{#each plan.caracteristicas as caracteristica}
				<li class="flex flex-row items-center gap-2"><ArrowSvg /> {caracteristica}</li>
			{/each}
		</ul>

		<div class="btn btn-neutral absolute top-[-1rem] cursor-default uppercase">Más Popular</div>
	</div>
{/snippet}

{#snippet insight(insight: Insight)}
	<div class="card bg-base-300 shadow-sm sm:max-w-[47%] lg:max-w-[30%]">
		<figure>
			<img src={insight.img} alt="" />
		</figure>

		<div class="card-body">
			<p class="text-base-content uppercase">{insight.fecha}</p>
			<h2 class="card-title">{insight.titulo}</h2>
			<p>{insight.contenido}</p>

			<button class="btn btn-link self-start uppercase">Leer más</button>
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

		<div class="flex flex-row flex-wrap justify-center gap-5">
			{#each funciones1 as fn, i}
				{@render funcion(fn, i + 1, true)}
			{/each}
		</div>
	</div>

	<div class="bg-base-100 flex flex-col justify-center gap-5 px-10 py-5 md:px-20 md:py-10">
		<div class="flex flex-col gap-10 md:flex-row-reverse">
			<div class="flex flex-col md:w-2/3">
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
				{@render opinion(opiniones[1])}
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
				{@render opinion(opiniones[2])}
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

		<div class="flex flex-row flex-wrap justify-center gap-10">
			{#each functiones2 as fn, i}
				{@render funcion(fn, i + 1)}
			{/each}
		</div>
	</div>

	<div
		class="bg-base-100 flex flex-col items-center justify-center gap-5 px-10 py-5 md:px-20 md:py-10"
	>
		<div class="text-center">
			{@render mainTitle('Elige el plan perfecto para tu empresa')}
		</div>
		<p class="text-center">
			Únete a las empresas que ya confían en CertiNet para agilizar su búsqueda de talento
			tecnológico calificado.
		</p>
		<div class="mt-10 flex flex-row flex-wrap items-center justify-center gap-5">
			{@render plan(planes[0])}
			{@render planDestacado(planes[1])}
			{@render plan(planes[2])}
		</div>
	</div>

	<div
		class="bg-base-100 flex flex-col items-center justify-center gap-5 px-10 pb-5 md:px-20 md:pb-10"
	>
		<div class="text-center">
			{@render mainTitle('Insights Recientes en CertiNet')}

			<p>
				Descubre artículos que abordan las tendencias en la conexión entre empresas y talento
				tecnológico certificado. Estos recursos te proporcionarán las herramientas necesarias para
				optimizar tus procesos de contratación y potenciar tu búsqueda de expertos en el sector.
			</p>
		</div>

		<div class="flex flex-row flex-wrap justify-center gap-5">
			{#each insights as ins}
				{@render insight(ins)}
			{/each}
		</div>
	</div>

	<div class="bg-base-100 flex flex-col justify-center gap-5 px-10 py-5 md:px-20 md:py-10">
		<div class="flex flex-col gap-10 md:flex-row-reverse">
			<div class="flex flex-col md:w-2/3">
				<div class="md:w-2/3">
					{@render mainTitle('Transforma tu Proceso de Reclutamiento con CertiNet')}
				</div>

				<p class="mt-4 font-light">
					Facilitamos la conexión entre empresas y profesionales certificados mediante una
					plataforma intuitiva. Ajusta tu búsqueda con filtros personalizados que garantizan que
					encuentres rápidamente el talento tecnológico que tu proyecto necesita, optimizando así
					tus tiempos de selección y aumentando tus posibilidades de contratar a los mejores
					expertos.
				</p>
				
				<a class="btn btn-primary mt-5 w-40" href="/signup">Inicia tu proceso</a>
			</div>

			<div class="bg-base-200 flex items-center justify-center rounded-3xl">
				<figure class="scale-90 p-10">
					<img src="/certinet-img-4.png" alt="img" />
				</figure>
			</div>
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
