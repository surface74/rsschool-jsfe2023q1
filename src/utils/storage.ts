import { LevelItem } from '../types/level-item';

type State = {
    levels: LevelItem[];
    currentLevel: number;
};

export default class Storage {
    static RestoreLevelsState(storageKey: string): LevelItem[] | null {
        const result: string | null = localStorage.getItem(storageKey);

        return result ? JSON.parse(result) : null;
    }

    static SaveLevelsState(storageKey: string, levels: LevelItem[]): void {
        localStorage.setItem(storageKey, JSON.stringify(levels));
    }

    static RestoreCurrentLevelState(storageKey: string): number | null {
        const result: string | null = localStorage.getItem(storageKey);

        return result ? Number(result) : null;
    }

    static SaveCurrentLevelState(storageKey: string, levelId: number): void {
        localStorage.setItem(storageKey, JSON.stringify(levelId));
    }
}
