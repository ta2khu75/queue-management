export class IsUtil {
    static isService(object: object): object is Service {
        return 'service_id' in object;
    }
    static isDevice(object: object): object is Device {
        return 'device_id' in object;
    }
    static isAccount(object: object): object is Account {
        return 'account_id' in object;
    }
    static isType<T extends object>(object: object, field: string): object is T {
        return field in object
    }

}