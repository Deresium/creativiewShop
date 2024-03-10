import TitleValueVM from "../viewmodels/TitleValueVM.ts";

export default class TitleValueParser {
    public static parseTitleValues<T, V>(data: any): Array<TitleValueVM<T, V>> {
        return data.map((item: any) => new TitleValueVM(item.title, item.value))
    }
}