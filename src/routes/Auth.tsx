import { h } from 'preact'
import { useContext, useRef, useState } from 'preact/hooks'
import { observer } from 'mobx-react'

import { AirgramContext } from '../airgram'

import { Button, Content, Input } from '../components'

interface AuthProps {
    state: string
}

const Auth = observer(({ state }: AuthProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLDivElement>(null)

    const airgram = useContext(AirgramContext)

    const [phone, setPhone] = useState('')

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

    const handlePhoneInput = (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            const { value } = e.target
            setPhone(value)
        }
    }

    const handleNext = () => {}
    return (
        <Content containerRef={containerRef}>
            <header class="text-center">
                <span>Logo</span>
                <h1 class="text-xl">Kaigram</h1>
            </header>
            <main ref={formRef}>
                <Input
                    type="tel"
                    label="Enter your phone number to log in"
                    name="phoneInput"
                    placeholder="Your phone number"
                    value={phone}
                    handleInput={handlePhoneInput}
                />
                <Button text="Next" handleClick={handleNext} uid="next" />
            </main>
        </Content>
    )
})

export default Auth
