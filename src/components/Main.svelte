<script lang="ts">
    import type { Airgram } from '@airgram/web'

    import { getContext } from 'svelte'
    import Dialogs from '../pages/Dialogs.svelte'

    const airgram: Airgram = getContext('airgram')

    const savedDialogs = localStorage.getItem('dialogs')
    let dialogs = new Map<number, string>(
        savedDialogs ? JSON.parse(savedDialogs) : [],
    )

    if (dialogs.size === 0) {
        airgram.api
            .getChats({
                limit: 100,
                offsetOrder: '9223372036854775807',
            })
            .then((value) => {
                if (value.response._ === 'error') return

                console.log(value.response.chatIds)
            })
    }
</script>

<div>
    <h2>Main page</h2>
    <Dialogs list={dialogs} />
</div>
