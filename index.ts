function get<T, S1 extends keyof T, S2 extends keyof (T[S1])>(
    obj: T,
    prop1: S1,
    prop2: S2
): T[S1][S2];
function get<T, S1 extends keyof T>(
    obj: T,
    prop1: S1
): T[S1];
function get<T, S1 extends keyof T, S2 extends keyof (T[S1])>(
    obj: T,
    prop1: S1,
    prop2?: S2
):  T[S1] | T[S1][S2] {
    const props = [].slice.call(arguments, 1);
    let value: any = obj;

    while (props.length > 0) {
        let nextProp = props.shift();
        value = value[nextProp];
    }

    return value;
}

export = get;