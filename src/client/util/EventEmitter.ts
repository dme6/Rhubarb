type VariableParamsFunc = (...params: any[]) => void;

interface Event {
    name: string;
    func: VariableParamsFunc
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

    on(name: string, func: VariableParamsFunc) {
        this.events.push({ name, func });
    }

}