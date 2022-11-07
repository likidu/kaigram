import Welcome from './Welcome.svelte';
import NotFound from './NotFound.svelte';

export default {
  // Exact paths
  '/': Welcome,
  '*': NotFound,
};
