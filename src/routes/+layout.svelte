<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="container mx-auto h-screen px-4">
	{@render children()}
</div>
