import { FunctionalComponent, h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import tg from '../tg'

const Home: FunctionalComponent = () => {
    const [started, setStarted] = useState(false)

    useEffect(() => {
        tg.action = () => setStarted(true)
    }, [])

    return (
        <div>
            <h1>Home</h1>
            {started ? (
                <p>TdLib client was started</p>
            ) : (
                <p>TdLib client is starting...</p>
            )}
        </div>
    )
}

export default Home
