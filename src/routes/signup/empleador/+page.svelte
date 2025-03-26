<main class="flex flex-col items-center justify-center gap-5 m-30">
	<h1 class="text-3xl">Signup Empleador</h1>

	<form class="flex flex-col gap-1 px-5">
		<label class="input w-full">
			<span class="label">Razón Social</span>
			<input class="input" name="razonSocial" id="razonSocial" type="text" />
		</label>

		<label class="input w-full">
			<span class="label">Correo</span>
			<input class="input" name="correo" id="correo" type="email" />
		</label>

		<label class="input w-full">
			<span class="label"> Fecha de Establecimiento </span>
			<input
				class="input"
				type="date"
				name="fechaEstablecimiento"
				id="fechaEstablecimiento"
				placeholder="Fecha de Establecimiento"
			/>
		</label>

		<label class="input w-full">
			<span class="label">Giro</span>
			<input class="input" type="text" name="giro" id="giro" placeholder="Profesión" />
		</label>

		<a href="/empleador">
			<button class="btn btn-secondary">Signup</button>
		</a>
	</form>
</main>
