import { FunctionalComponent, h } from 'preact'
import { route, Router, RouterOnChangeArgs } from 'preact-router'
import { createHashHistory } from 'history'

import { Airgram, AirgramContext } from './airgram'

import AuthStore from './stores/AuthStore'

import Home from './routes/Home'
import Auth from './routes/Auth'
import NotFoundPage from './routes/NotFound'

declare module 'preact' {
    namespace createElement.JSX {
        interface IntrinsicAttributes {
            path?: string
        }
    }
}

// const apiId = process.env.KAIGRAM_API_ID
// const apiHash = process.env.KAIGRAM_API_HASH

const App: FunctionalComponent = () => {
    const airgram = new Airgram({
        apiId: 2593677,
        apiHash: 'fbc1cccc956dceb3c49f53078fa63655',
        jsLogVerbosityLevel: 'info',
        logVerbosityLevel: 2,
    })

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

    const handleRouteChange = (e: RouterOnChangeArgs) => {
        const { url } = e
        const isAuthed = localStorage.getItem('authed')
        if (url === '/') {
            if (!isAuthed || !JSON.parse(isAuthed)) route('/auth', true)
        }
    }

    return (
        <AirgramContext.Provider value={airgram}>
            <div id="app" class="font-kaios h-screen relative flex flex-col">
                <Router
                    history={createHashHistory()}
                    onChange={handleRouteChange}
                >
                    <Home path="/" />
                    <Auth path="/auth" auth={AuthStore} />
                    <NotFoundPage default />
                </Router>
            </div>
        </AirgramContext.Provider>
    )
}

export default App
