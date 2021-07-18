interface Event {
    name: string;
    func: Function;
}

export class EventEmitter {

    private events: Event[] = [];

    emit(name: string, ...params: any[]) {
        for(const e of this.events) {
            if(e.name == name) {
                e.func(...params);
                break;
            }
        }
    }

    on(name: string, func: Function) {
        this.events.push({ name, func });
    }

}