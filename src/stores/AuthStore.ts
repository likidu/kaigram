import { makeObservable, observable } from 'mobx'
import { useContext } from 'preact/hooks'

import {
    AuthorizationStateUnion,
    Instance,
    UpdateAuthorizationState,
} from '@airgram/core'
import { AirgramContext } from '../airgram'

import { AUTHORIZATION_STATE } from '@airgram/constants'

export enum LoginState {
    WaitTDLib,
    WaitPhoneNumber,
    WaitCode,
    WaitRegistration,
    WaitPassword,
    Ready,
}

export interface AuthStoreProps {
    loginState: LoginState
}

class AuthStore {
    private airgram: Instance<any>
    private authState: AuthorizationStateUnion

    constructor() {
        makeObservable(this, {
            authState: observable,
        })
        this.airgram = useContext(AirgramContext)
        this.authState = {
            _: AUTHORIZATION_STATE.authorizationStateWaitTdlibParameters,
        }
    }

    private onUpdate = ({
        authorizationState,
    }: UpdateAuthorizationState): boolean => {
        switch (authorizationState._) {
            case AUTHORIZATION_STATE.authorizationStateWaitPhoneNumber:
                this.airgram.api.setAuthenticationPhoneNumber({ phone })
                break
            case AUTHORIZATION_STATE.authorizationStateWaitCode:
                this.airgram.api.checkAuthenticationCode({ code })
            default:
                return false
        }
    }

    // merge = update => {
    //     switch (update['@type']) {
    //         case 'updateAuthorizationState':
    //             break

    //         default:
    //             break
    //     }
    // }
}

const store = new AuthStore()
export default store
