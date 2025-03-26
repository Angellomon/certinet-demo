<script lang="ts">
	const trustedBy = [
		'Unilever',
		'RIVERSIDE',
		'Johnson&Johnson',
		'AbInBev',
		'seek',
		'Globant',
		'INNOVID',
		'SWISS MEDICAL'
	];
</script>

<main class="mx-15 mt-5 md:mt-10">
	<div class="flex flex-col-reverse md:w-2/3 md:flex-col">
		<div class="flex flex-row flex-wrap gap-5">
			<div class="flex flex-row items-center justify-around gap-2">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-4 w-4"
				>
					<g>
						<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
						<polyline points="22 4 12 14.01 9 11.01"> </polyline>
					</g>
				</svg>
				Certificaciones Verificadas
			</div>
			<div class="flex flex-row items-center justify-around gap-2">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-4 w-4"
				>
					<g>
						<circle cx="12" cy="8" r="7"></circle>
						<polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
					</g>
				</svg>
				Satisfacción Garantizada
			</div>
			<div class="flex flex-row items-center justify-around gap-2">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="h-4 w-4"
				>
					<g>
						<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"> </path>
					</g>
				</svg>
				Compras Protegidas
			</div>
		</div>

		<h1 class="my-2 text-5xl font-thin">
			Contacta <strong>profesionales</strong> <i><u>certificados.</u></i>
		</h1>
		<p class="text-xl">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec erat aliquam, aliquet
			libero a, pulvinar dolor.
		</p>
	</div>

	<div class="my-2 flex flex-col gap-10 md:flex-row">
		<a href="/login/empleador">
			<button class="btn btn-primary"> Soy Empleador </button>
		</a>
		<a href="/login/profesionista">
			<button class="btn btn-secondary"> Soy Profesionales </button>
		</a>
	</div>

	<div class="my-10 flex flex-col gap-10">
		<div
			class="card card-border border-accent-content hover:border-accent bg-base-100 cursor-pointer border"
		>
			<div class="card-body">
				<h2 class="card-title">Profesionista</h2>
				<p>Ut mattis id sem sed condimentum. Duis in dictum nulla. Donec eget ultrices magna.</p>
			</div>
		</div>

		<div
			class="card card-border border-secondary-content hover:border-secondary bg-base-100 cursor-pointer border"
		>
			<div class="card-body">
				<h2 class="card-title">Empleador</h2>
				<p>Ut mattis id sem sed condimentum. Duis in dictum nulla. Donec eget ultrices magna.</p>
			</div>
		</div>
	</div>

	<div class="divider font-light">TRUSTED BY</div>

	<div class="flex flex-row flex-wrap gap-10 justify-center">
		{#each trustedBy as company}
			<div class="text-2xl font-bold">{company}</div>
		{/each}
	</div>

	<div class="divider"></div>

	<div class="card card-border bg-base-100 border">
		<div class="card-body gap-3">
			<h2 class="card-title font-bold">¿Buscas personal <u>certificado?</u></h2>
			<p class="font-medium">Ut mattis donec eget ultrices magna.</p>

			<div class="flex flex-col md:flex-row md:justify-around">
				<div class="flex flex-col gap-2">
					<div class="flex flex-row gap-3">
						<svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><g
								><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"
								></polyline></g
							></svg
						>
						<strong>Full Stack Development</strong>
					</div>

					<div class="flex flex-row gap-3">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-5 w-5"
							><g
								><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path
									d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
								></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></g
							></svg
						>
						<strong>Oracle DBA Certified</strong>
					</div>

					<div class="flex flex-row gap-3">
						<svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><g
								><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect
									x="7"
									y="7"
									width="3"
									height="9"
								></rect><rect x="14" y="7" width="3" height="5"></rect></g
							></svg
						>
						<strong>Azure DevOps</strong>
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<div class="flex flex-row gap-3">
						<svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><g
								><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect
									x="9"
									y="9"
									width="6"
									height="6"
								></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"
								></line><line x1="9" y1="20" x2="9" y2="23"></line><line
									x1="15"
									y1="20"
									x2="15"
									y2="23"
								></line><line x1="20" y1="9" x2="23" y2="9"></line><line
									x1="20"
									y1="14"
									x2="23"
									y2="14"
								></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"
								></line></g
							></svg
						>
						<strong>QA Automation</strong>
					</div>

					<div class="flex flex-row gap-3">
						<svg
							class="h-5 w-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><g
								><rect x="3" y="3" width="7" height="7"></rect><rect
									x="14"
									y="3"
									width="7"
									height="7"
								></rect><rect x="14" y="14" width="7" height="7"></rect><rect
									x="3"
									y="14"
									width="7"
									height="7"
								></rect></g
							></svg
						>
						<strong>Data Engineer</strong>
					</div>

					<div class="flex flex-row gap-3">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-bar-chart-2 h-5 w-5"
							><g
								><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"
								></line><line x1="6" y1="20" x2="6" y2="14"></line></g
							></svg
						>
						<strong>Data Scientist</strong>
					</div>
				</div>
			</div>
			<a href="/signup/empleador">
				<button class="btn btn-secondary">Comienza la búsqueda</button>
			</a>
		</div>
	</div>
</main>
