<script>
	import RabbitForm from '$lib/components/RabbitForm.svelte';
	import { page } from '$app/stores';
</script>

{JSON.stringify($page.params.rabbit)}
<RabbitForm rabbitId={$page.params.rabbit}></RabbitForm>
