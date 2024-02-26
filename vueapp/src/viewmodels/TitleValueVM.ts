export default class TitleValueVM<T, V> {
    private readonly title: T;
    private readonly value: V;


    constructor(item: T, value: V) {
        this.title = item;
        this.value = value;
    }

    public getItem(): T {
        return this.title;
    }

    public getValue(): V {
        return this.value;
    }
}