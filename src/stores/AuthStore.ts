import { makeObservable, observable } from 'mobx'

export enum LoginState {
    WaitTDLib,
    WaitPhoneNumber,
    WaitCode,
    WaitRegistration,
    WaitPassword,
    Ready,
}

export class AuthStore {
    loginState: LoginState

    constructor() {
        makeObservable(this, {
            loginState: observable,
        })
        this.loginState = LoginState.WaitTDLib
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
