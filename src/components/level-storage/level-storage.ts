import { LevelItem } from '../../types/level-item';
import Level1 from '../levels/level-1';

export default class LevelStorage {
    storage: LevelItem[] = [];

    constructor() {
        this.storage.push({ level: new Level1(), done: true, helpUsed: false });
        this.storage.push({ level: new Level1(), done: true, helpUsed: false });
        this.storage.push({ level: new Level1(), done: true, helpUsed: true });
        this.storage.push({ level: new Level1(), done: false, helpUsed: false });
        this.storage.push({ level: new Level1(), done: false, helpUsed: false });
    }

    public getStorage() {
        return this.storage;
    }
}
