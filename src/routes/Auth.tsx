import { h } from 'preact'
import { useContext, useRef, useState } from 'preact/hooks'
import { observer } from 'mobx-react'

import { Button, Content, Input } from '../components'
import { AuthStoreProps, LoginState } from '../stores/AuthStore'

interface AuthProps {
    auth: AuthStoreProps
}

const Auth = observer(({ auth }: AuthProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLDivElement>(null)

    const [phone, setPhone] = useState('')

    const { loginState } = auth

    const handlePhoneInput = (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            const { value } = e.target
            setPhone(value)
        }
    }

    const handleNext = () => {
        if (loginState === LoginState.WaitPhoneNumber) {
        }
    }
    return (
        <Content containerRef={containerRef}>
            <header class="text-center">
                <span>Logo</span>
                <h1 class="text-xl">Kaigram</h1>
            </header>
            <main ref={formRef}>
                {loginState === LoginState.WaitPhoneNumber && (
                    <Input
                        type="tel"
                        label="Enter your phone number to log in"
                        name="phoneInput"
                        placeholder="Your phone number"
                        value={phone}
                        handleInput={handlePhoneInput}
                    />
                )}
                <Button text="Next" handleClick={handleNext} uid="next" />
            </main>
        </Content>
    )
})

export default Auth
