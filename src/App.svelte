<script lang="ts">
import { setContext } from 'svelte';
import Router from 'svelte-spa-router';

import { Airgram, Auth } from './app/services/airgram';
import { AIRGRAM_CONFIG } from './app/const';

import routes from './routes';

import OnyxApp from './ui/components/app/OnyxApp.svelte';
import Dashboard from './ui/components/app/Dashboard.svelte';

const airgram = new Airgram(AIRGRAM_CONFIG);

airgram.use(
  new Auth({
    code: () => window.prompt('Please enter the secret code:') || '',
    phoneNumber: () => window.prompt('Please enter your phone number:') || '',
    password: () => window.prompt('Please enter your password:') || '',
  }),
);

airgram.use(async (ctx, next) => {
  if ('request' in ctx) {
    console.log('🚀 [Airgram Request]:', ctx.request);
  } else if (ctx.update) {
    console.log('🚀 [Airgram Update]:', ctx.update);
  }
  await next();
  if ('request' in ctx) {
    console.log('🚀 [Airgram Response]:', ctx.request.method, ctx.response);
  }
});

setContext('airgram', airgram);
</script>

<!-- <main class="text-center p-4 mx-0"> -->
<OnyxApp>
  <!-- Routers -->
  <Router routes="{routes}" />
  {#if false}
    <Dashboard slot="dashboard">Hello 😁</Dashboard>
  {/if}
</OnyxApp>
<!-- </main> -->
