import TdClient from 'tdweb';
import Options from '../options';

export default class Tg {
    client: TdClient;
    action: () => void;

    constructor() {
        Options.onUpdate = update => this.onUpdate(update);
        this.client = new TdClient(Options);
    }

    onUpdate(update): void {
        console.log(update);
        if (this.action) this.action();
    }
}