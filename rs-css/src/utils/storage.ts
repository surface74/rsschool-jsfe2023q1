import { StorageKey } from '../enums/storage-key';
import { LevelItem } from '../types/level-item';

export default class Storage {
    static RestoreLevelsState(): LevelItem[] | null {
        const result: string | null = localStorage.getItem(StorageKey.LEVELS);

        return result ? JSON.parse(result) : null;
    }

    static SaveLevelsState(levels: LevelItem[]): void {
        localStorage.setItem(StorageKey.LEVELS, JSON.stringify(levels));
    }

    static RestoreCurrentLevelState(): number | null {
        const result: string | null = localStorage.getItem(StorageKey.CURRENT_LEVEL);

        return result ? Number(result) : null;
    }

    static SaveCurrentLevelState(levelId: number): void {
        localStorage.setItem(StorageKey.CURRENT_LEVEL, JSON.stringify(levelId));
    }
}
