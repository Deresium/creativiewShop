import TitleValueVM from "../viewmodels/TitleValueVM.ts";
import i18n from "../i18n/i18n.ts";

export default class TitleValueParser {
    private static readonly t = i18n.global.t;

    public static parseTitleValues<T, V>(data: any, i18n = false): Array<TitleValueVM<T, V>> {
        if (i18n) {
            return data.map((item: any) => new TitleValueVM(TitleValueParser.t(item.title), item.value));
        } else {
            return data.map((item: any) => new TitleValueVM(item.title, item.value));
        }
    }
}