import { LevelItem } from '../../types/level-item';
import Level1 from '../levels/level-1';

export default class LevelStorage {
    storage: LevelItem[] = [];

    constructor() {
        this.storage.push({ level: new Level1(), done: false });
    }

    public getStorage() {
        return this.storage;
    }
}
