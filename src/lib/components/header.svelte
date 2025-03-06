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

<nav class="relative hidden items-center gap-5 lg:flex lg:flex-row lg:justify-end lg:px-5">
	<a href="/"> <div class="absolute left-5 top-0">CertiNet Logo</div></a>
	<ul class="flex flex-row gap-5">
		{#each paths as path}
			<li><a href={path.path}>{path.name}</a></li>
		{/each}
	</ul>
</nav>
