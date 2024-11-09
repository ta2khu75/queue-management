export class IsUtil {
    static isType<T extends object>(object: object, field: string): object is T {
        return field in object
    }

}