export default class TitleValueVM<T, V> {
    private readonly title: T;
    private readonly value: V;


    constructor(title: T, value: V) {
        this.title = title;
        this.value = value;
    }

    public getTitle(): T {
        return this.title;
    }

    public getValue(): V {
        return this.value;
    }
}