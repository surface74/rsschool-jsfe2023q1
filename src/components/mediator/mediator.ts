import { EventName } from '../../enums/events/event-names';

export default class Mediator {
    private static storage = new Mediator();
    private items = new Map<string, string>();
    private _listeners = new Map<EventName, Set<(param: string) => void>>();

    constructor() {
        return Mediator.storage;
    }

    static getInstance() {
        return this.storage;
    }

    setState(name: EventName, value: string) {
        this.items.set(name, value);
        this.notify(name, value);
    }

    getState(name: EventName) {
        if (this.items.has(name)) {
            return this.items.get(name);
        }
        return null;
    }

    subscribe(nameEvent: EventName, listenerMethod: (param: string) => void) {
        let listListeners = this._listeners.get(nameEvent);
        if (!listListeners) {
            listListeners = new Set<(param: string) => void>();
            this._listeners.set(nameEvent, listListeners);
        }
        listListeners.add(listenerMethod);
    }

    unsubscribe(nameEvent: EventName, listenerMethod: (param: string) => void) {
        const listListeners = this._listeners.get(nameEvent);
        if (listListeners) {
            listListeners.delete(listenerMethod);
        }
    }

    private notify(nameEvent: EventName, params: string) {
        const listListeners = this._listeners.get(nameEvent);
        if (listListeners) {
            listListeners.forEach((listener) => listener(params));
        }
    }
}
