<script lang="ts">
    import { setContext } from 'svelte'
    import { Airgram, Auth } from './airgram'
    import {
        apiHash,
        apiId,
        jsLogVerbosityLevel,
        logVerbosityLevel,
    } from './config'

    import Main from './routes/Main.svelte'

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

<div id="app">{Main}</div>
