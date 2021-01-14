<script lang="ts">
    import { getContext } from 'svelte'
    import { Auth } from '../airgram'
    import type { Airgram } from '../airgram'

    const airgram: Airgram = getContext('airgram')

    airgram.use(
        new Auth({
            code: () => window.prompt('Please enter the secret code:') || '',
            phoneNumber: () =>
                window.prompt('Please enter your phone number:') || '',
            password: () => window.prompt('Please enter your password:') || '',
        }),
    )
</script>

<div id="login" />
