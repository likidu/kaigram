import { FunctionalComponent, h } from 'preact'
import { useRef, useState } from 'preact/hooks'
import { observer } from 'mobx-react'

import { Button, Content, Input } from '../components'

interface AuthProps {
    state: string
}

const Auth = observer(({ state }: AuthProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLDivElement>(null)

    const [phone, setPhone] = useState('')

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
