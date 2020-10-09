<script lang="ts">
    import { setContext } from 'svelte'
    import { Airgram } from '@airgram/web'
    import { Auth } from './Auth'
    import {
        apiHash,
        apiId,
        jsLogVerbosityLevel,
        logVerbosityLevel,
    } from './config'

    /* 	import { Tg } from './Tg';

	let client = new Tg();
	let started = false;

	client.action = () => started = true;
    setContext('tgClient', new Tg()); */

    let started = false

    const airgram = new Airgram({
        apiId,
        apiHash,
        jsLogVerbosityLevel,
        logVerbosityLevel,
    })

    airgram.use(
        new Auth({
            code: () => window.prompt('Please enter the secret code:') || '',
            phoneNumber: () =>
                window.prompt('Please enter your phone number:') || '',
            password: () => window.prompt('Please enter your password:') || '',
        }),
    )

    airgram.use(async (ctx, next) => {
        if ('request' in ctx) {
            console.log('🚀 [Airgram Request]:', ctx.request)
        } else if (ctx.update) {
            console.log('🚀 [Airgram Update]:', ctx.update)
        }
        await next()
        if ('request' in ctx) {
            console.log(
                '🚀 [Airgram Response]:',
                ctx.request.method,
                ctx.response,
            )
        }
    })

    setContext('airgram', airgram)
</script>

<style>
    main {
        text-align: center;
        padding: 1em;
        max-width: 240px;
        margin: 0 auto;
    }

    h1 {
        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }

    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>

<main>
    <h1>Svelte TdLib starter</h1>
    {#if started}
        <p>TdLib client was started</p>
    {:else}
        <p>TdLib client is starting...</p>
    {/if}
    <p>
        Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
        how to build Svelte apps.
    </p>
</main>
