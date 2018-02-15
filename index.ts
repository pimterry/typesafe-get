function get<T, S extends keyof T>(obj: T, prop: S): T[S] {
    return obj[prop];
}

export = get;