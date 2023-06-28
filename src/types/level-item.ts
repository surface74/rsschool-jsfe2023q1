import Level from '../components/levels/level';
import Level1 from '../components/levels/level-1';

export type LevelItem = {
    level: Level | Level1;
    done: boolean;
    helpUsed: boolean;
};
