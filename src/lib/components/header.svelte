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

<nav class="navbar bg-base-300 shadow-sm">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">Certinet Demo</a>
	</div>

	<div class="flex-none">
		<ul class="menu menu-horizontal px-1">
			{#each paths as path}
				<li><a href={path.path}>{path.name}</a></li>
			{/each}
		</ul>
	</div>
</nav>
