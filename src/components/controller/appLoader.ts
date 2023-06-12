import Loader from './loader';
import { DataType } from '../../types';

class AppLoader extends Loader<DataType> {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '27731bd001094f2691fd2b200ab13460', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
