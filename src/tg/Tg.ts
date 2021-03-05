import TdClient, { TdObject, TdOptions } from 'tdweb'
import options from './options'

import packageJson from '../../package.json'

class Tg {
    protected readonly client: TdClient
    private static classClient: Tg

    private readonly disableLog = false
    action!: () => void

    constructor(options: TdOptions) {
        options.onUpdate = update => this.onUpdate(update)
        this.client = new TdClient(options)
    }

    public static getClient() {
        if (!this.classClient) {
            this.classClient = new Tg(options)
        }
        return this.classClient
    }

    send = (query: TdObject) => {
        if (!this.client) {
            console.log('send (none init)', query)
            return Promise.reject('tdweb client is not ready yet')
        }

        if (!this.disableLog) {
            console.log('send', query)

            return this.client
                .send(query)
                .then(result => {
                    console.log('send result', result)
                    return result
                })
                .catch(error => {
                    console.error('send error', error)
                    throw error
                })
        } else {
            return this.client.send(query)
        }
    }

    // sendTdParameters = async () => {
    //     const apiId = process.env.REACT_APP_TELEGRAM_API_ID
    //     const apiHash = process.env.REACT_APP_TELEGRAM_API_HASH

    //     // console.log('[td] sendTdParameters', apiHash, apiId);
    //     if (!apiId || !apiHash) {
    //         if (
    //             window.confirm(
    //                 'API id is missing!\n' +
    //                     'In order to obtain an API id and develop your own application ' +
    //                     'using the Telegram API please visit https://core.telegram.org/api/obtaining_api_id',
    //             )
    //         ) {
    //             window.location.href =
    //                 'https://core.telegram.org/api/obtaining_api_id'
    //         }
    //     }

    //     const { version } = packageJson

    //     this.send({
    //         '@type': 'setTdlibParameters',
    //         parameters: {
    //             '@type': 'tdParameters',
    //             use_test_dc: false,
    //             api_id: apiId,
    //             api_hash: apiHash,
    //             system_language_code: navigator.language || 'en',
    //             device_model: 'KaiOS',
    //             system_version: 'KaiOS',
    //             application_version: version,
    //             use_secret_chats: false,
    //             use_message_database: true,
    //             use_file_database: false,
    //             database_directory: '/db',
    //             files_directory: '/',
    //         },
    //     })
    // }

    onUpdate = (update: TdObject): void => {
        if (!this.disableLog) {
            console.log('receive update', update)
        }
        if (this.action) this.action()
    }
}

// Returns a singleton of the class instance
const tg = new Tg(options)
export default tg
