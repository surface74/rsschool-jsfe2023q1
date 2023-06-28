import { LevelItem } from '../../types/level-item';
import Level1 from '../levels/level-1';

export default class LevelStorage {
    storage: LevelItem[] = [];

    constructor() {
        this.storage.push({ level: new Level1(), done: true, helpUsed: false });

        // const level2 = new Level1();
        // level2.LEVEL_TITLE = 'Next level';
        // console.log('level2.getHtmlElement(): ', level2.getHtmlElement());
        // this.storage.push({ level: level2, done: true, helpUsed: false });

        // this.storage.push({ level: new Level1(), done: true, helpUsed: true });
        // this.storage.push({ level: new Level1(), done: false, helpUsed: false });
        // this.storage.push({ level: new Level1(), done: false, helpUsed: false });
    }

    public getStorage() {
        return this.storage;
    }
}
