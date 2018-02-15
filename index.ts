function get<
    T,
    S1 extends keyof T,
    R2 extends T[S1] & {},
    S2 extends keyof R2
>(
    obj: T,
    prop1: S1,
    prop2: S2
): R2 | undefined;
function get<
    T,
    S1 extends keyof T
>(
    obj: T,
    prop1: S1
): T[S1];
function get<
    T,
    S1 extends keyof T,
    S2 extends keyof T[S1]
>(
    obj: T,
    prop1: S1,
    prop2?: S2
):  T[S1] | T[S1][S2] | undefined {
    const props = [].slice.call(arguments, 1);
    let value: any = obj;

    while (props.length > 0) {
        let nextProp = props.shift();
        value = value[nextProp];
        if (value == null) return undefined;
    }

    return value;
}

export = get;