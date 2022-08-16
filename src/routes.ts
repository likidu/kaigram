import TaskList from './app/routes/TaskList.svelte';
import Welcome from './app/routes/Welcome.svelte';
import NotFound from './app/routes/NotFound.svelte';

export default {
	// Exact paths
	'/': Welcome,
	'/tasklist': TaskList,
	'*': NotFound,
};
