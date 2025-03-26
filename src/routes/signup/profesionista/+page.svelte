<main class="flex flex-col items-center justify-center gap-5 my-30">
	<h1 class="text-3xl">Signup Profesionista</h1>

	<form class="flex flex-col gap-1 px-5">
		<label class="input">
			<span class="label">Nombre</span>
			<input class="input" name="nombre" id="nombre" type="text" />
		</label>

		<label class="input">
			<span class="label">Apellidos</span>
			<input class="input" name="apellidos" id="apellidos" type="text" />
		</label>

		<label class="input">
			<span class="label">Correo</span>
			<input class="input" name="correo" id="correo" type="email" placeholder="email@site.com" />
		</label>

		<label class="input">
			<span class="label"> Fecha de Nacimiento </span>
			<input
				class="input"
				type="date"
				name="fechaNacimiento"
				id="fechaNacimiento"
				placeholder="Fecha de Nacimiento"
			/>
		</label>

		<label class="input">
			<span class="label">Profesión</span>
			<input class="input" type="text" name="profesion" id="profesion" placeholder="Profesión" />
		</label>

		<a href="/profesionista">
			<button class="btn btn-secondary">Signup</button>
		</a>
	</form>
</main>
