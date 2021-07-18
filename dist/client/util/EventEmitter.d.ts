export declare class EventEmitter {
    private events;
    emit(name: string, ...params: any[]): void;
    on(name: string, func: Function): void;
}
