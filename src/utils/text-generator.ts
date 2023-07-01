export default class TextGenerator {
    public static getGenerator(text: string): Generator<string, void, string> {
        return (function* () {
            let i = 0;
            while (i < text.length) {
                yield text[i++];
            }
        })();
    }
}
