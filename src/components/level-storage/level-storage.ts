import Level from '../levels/level';
import { LevelItem } from '../../types/level-item';
import Level1 from '../levels/level-1/index';
import Level2 from '../levels/level-2/index';
import Level3 from '../levels/level-3/index';
import Level4 from '../levels/level-4/index';

export default class LevelStorage {
    storage: LevelItem[] = [];

    constructor() {
        this.storage.push({ id: 1, done: false, helpUsed: false });
        this.storage.push({ id: 2, done: false, helpUsed: false });
        this.storage.push({ id: 3, done: false, helpUsed: false });
        this.storage.push({ id: 4, done: false, helpUsed: false });
    }

    public getLevel(levelId: number): Level | null {
        switch (levelId) {
            case 1:
                return new Level1();
                break;
            case 2:
                return new Level2();
                break;
            case 3:
                return new Level3();
                break;
            case 4:
                return new Level4();
                break;

            default:
                break;
        }

        return null;
    }

    public get length(): number {
        return this.storage.length;
    }

    public levelDone(levelId: number): void {
        this.storage[levelId - 1].done = true;
        this.storage[levelId - 1].helpUsed = false;
    }

    public levelGetHelp(levelId: number): void {
        if (!this.storage[levelId - 1].done) {
            this.storage[levelId - 1].helpUsed = true;
        }
    }

    public levelReset(): void {
        this.storage.forEach((level) => {
            level.done = false;
            level.helpUsed = false;
        });
    }

    public getStorage() {
        return this.storage;
    }
}
