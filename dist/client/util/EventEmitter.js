export class EventEmitter {
    constructor() {
        this.events = [];
    }
    emit(name, ...params) {
        for (const e of this.events) {
            if (e.name == name) {
                e.func(...params);
                break;
            }
        }
    }
    on(name, func) {
        this.events.push({ name, func });
    }
}
