import TdClient, { TdOptions } from 'tdweb'
import options from './options'

export default class Tg {
    client: TdClient
    action: () => void

    constructor() {
        options.onUpdate = update => this.onUpdate(update)
        this.client = new TdClient(options as TdOptions)
    }

    onUpdate(update): void {
        console.log(update)
        if (this.action) this.action()
    }
}
