import { Levels } from '../../types/level';
import { LevelItem } from '../../types/level-item';
import Level from '../levels/level';
import Level1 from '../levels/level-1';

export default class LevelStorage {
    storage: LevelItem[] = [];

    constructor() {
        this.storage.push({ id: 1, done: true, helpUsed: false });
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
