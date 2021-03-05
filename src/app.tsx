import { FunctionalComponent, h } from 'preact'
import { route, Route, Router, RouterOnChangeArgs } from 'preact-router'
import { createHashHistory } from 'history'

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

const App: FunctionalComponent = () => {
    const authorizationState = ''

    const handleRouteChange = (e: RouterOnChangeArgs) => {
        const { url } = e
        const isAuthed = localStorage.getItem('authed')
        if (url === '/') {
            if (!isAuthed || !JSON.parse(isAuthed)) route('/auth', true)
        }
    }

    return (
        <div id="app" class="font-kaios h-screen relative flex flex-col">
            <Router history={createHashHistory()} onChange={handleRouteChange}>
                <Home path="/" />
                <Auth path="/auth" state={authorizationState} />
                <NotFoundPage default />
            </Router>
        </div>
    )
}

export default App
