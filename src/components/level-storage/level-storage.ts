import Level from '../levels/level';
import { LevelItem } from '../../types/level-item';
import Level1 from '../levels/level-1/level-1';
import Level2 from '../levels/level-2/level-2';

export default class LevelStorage {
    storage: LevelItem[] = [];

    constructor() {
        this.storage.push({ id: 1, done: false, helpUsed: false });
        this.storage.push({ id: 2, done: false, helpUsed: false });
    }

    public get length(): number {
        return this.storage.length;
    }

    public levelDone(levelId: number): void {
        this.storage[levelId - 1].done = true;
        this.storage[levelId - 1].helpUsed = false;
    }

    public getStorage() {
        return this.storage;
    }

    public getLevel(levelId: number): Level | null {
        switch (levelId) {
            case 1:
                return new Level1();
                break;
            case 2:
                return new Level2();
                break;

            default:
                break;
        }

        return null;
    }
}
