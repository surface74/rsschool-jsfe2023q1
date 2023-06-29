import { Levels } from '../../types/level';
import { LevelItem } from '../../types/level-item';
import Level1 from '../levels/level-1/level-1';

export default class LevelStorage {
    storage: LevelItem[] = [];

    constructor() {
        this.storage.push({ id: 1, done: false, helpUsed: false });
    }

    public get length(): number {
        return this.storage.length;
    }

    public levelDone(levelId: number): void {
        console.log('levelId: ', levelId);
        this.storage[levelId - 1].done = true;
        this.storage[levelId - 1].helpUsed = false;
    }

    public getStorage() {
        return this.storage;
    }

    public getLevel(levelId: number): Levels | null {
        switch (levelId) {
            case 1:
                return new Level1();
                break;

            default:
                break;
        }

        return null;
    }
}
