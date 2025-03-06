<script lang="ts">
	const paths = [
		{
			path: '/login',
			name: 'Login'
		}
	];
</script>

<nav class="relative hidden items-center lg:flex lg:flex-row lg:justify-end lg:px-5 gap-5">
	<div class="absolute left-5">CertiNet Logo</div>
	<ul>
    {#each paths as path}
      <li><a href={path.path}>{path.name}</a></li> 
    {/each}
  </ul>
</nav>
