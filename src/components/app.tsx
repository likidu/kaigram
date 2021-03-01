import { FunctionalComponent, h } from 'preact'
import { Route, Router } from 'preact-router'

import Home from '../routes/Home'
import Profile from '../routes/Profile'
import NotFoundPage from '../routes/NotFound'
import Header from './Header'

const App: FunctionalComponent = () => {
    return (
        <div id="app">
            <Header />
            <Router>
                <Route path="/" component={Home} />
                <Route path="/profile/" component={Profile} user="me" />
                <Route path="/profile/:user" component={Profile} />
                <NotFoundPage default />
            </Router>
        </div>
    )
}

export default App
