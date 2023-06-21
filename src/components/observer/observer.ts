import { EventName } from '../../enums/events/event-names';

export default class Observer {
    private listeners = new Map<EventName, Array<<T>(param?: T) => void>>();

    subscribe(nameEvent: EventName, listener: <T>(param?: T) => void) {
        let eventListners = this.listeners.get(nameEvent);
        if (!eventListners) {
            eventListners = new Array<<T>(param?: T) => void>();
            this.listeners.set(nameEvent, eventListners);
        }
        eventListners.push(listener);
    }

    notify<T>(nameEvent: EventName, param?: T) {
        const eventListners = this.listeners.get(nameEvent);
        if (eventListners) {
            eventListners.forEach((listener) => listener(param));
        }
    }
}
