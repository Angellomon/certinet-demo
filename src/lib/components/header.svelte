<script lang="ts">
	const paths = [
		{
			path: '/login',
			name: 'Login'
		},
		{
			path: '/signup',
			name: 'Sign up'
		}
	];
</script>

<nav class="hidden lg:relative lg:gap-5 lg:flex lg:flex-row lg:justify-end lg:align-middle lg:items-center lg:px-5 lg:py-5">
	<a class="absolute left-5 py-3 px-5" href="/"> <div class="text-3xl">CertiNet Logo</div></a>
	<ul class="flex flex-row gap-5">
		{#each paths as path}
			<li><a class="link-hover" href={path.path}>{path.name}</a></li>
		{/each}
	</ul>
</nav>
