import { FunctionalComponent, h } from 'preact'
import { route, Router, RouterOnChangeArgs } from 'preact-router'
import { createHashHistory } from 'history'

import { Airgram, AirgramContext } from './airgram'

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
    const authorizationState = ''

    const airgram = new Airgram({
        apiId: 2593677,
        apiHash: 'fbc1cccc956dceb3c49f53078fa63655',
        jsLogVerbosityLevel: 'info',
        logVerbosityLevel: 2,
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
                    <Auth path="/auth" state={authorizationState} />
                    <NotFoundPage default />
                </Router>
            </div>
        </AirgramContext.Provider>
    )
}

export default App
