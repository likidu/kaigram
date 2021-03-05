import TdClient, { TdObject as NativeTdObject } from 'tdweb'
import { ApiRequest, TdObject, Provider as BaseTdProvider } from '@airgram/core'
import { deserializerFactory, serializerFactory } from './utils'

import { DeserializeFn, SerializeFn, TdWebProviderConfig } from './types'

export class Provider extends BaseTdProvider {
    private client: TdClient | null = null

    private readonly config: TdWebProviderConfig = {}

    private deserialize: DeserializeFn
    private serialize: SerializeFn

    public constructor(config: TdWebProviderConfig = {}) {
        super()
        this.config = config
        this.serialize = serializerFactory()
        this.deserialize = deserializerFactory()
    }

    public async destroy(): Promise<void> {
        throw new Error(
            '[Airgram] for web does not support `destroy()` method.',
        )
    }

    execute(): TdObject {
        throw new Error(
            '[Airgram] tdweb does not support synchronous operations.',
        )
    }

    public initialize(handleUpdate: (update: TdObject) => Promise<any>): void {
        this.client = new TdClient({
            ...this.config,
            onUpdate: (update: NativeTdObject) =>
                handleUpdate(this.deserialize(update)),
        })
    }

    async send({ method, params }: ApiRequest): Promise<TdObject> {
        if (!this.client) {
            throw new Error('[Airgram] tdweb instance has not initialized yet.')
        }
        try {
            const data = await this.client.send(
                this.serialize({ _: method, ...params }),
            )
            return this.deserialize(data as NativeTdObject & null)
        } catch (error) {
            if ('@type' in error && error['@type']) {
                if (error) {
                    const data_1 = this.deserialize(error)
                    // Ensures that the message property is a string
                    // See: https://github.com/tdlib/td/blob/master/example/web/tdweb/src/index.js#L648
                    data_1.message = String(data_1.message)
                    return data_1
                }
            } else {
                throw error
            }
        }
    }
}
