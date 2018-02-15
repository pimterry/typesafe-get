// The '& {}' hereeffectively eliminates undefined from the
// return type for us.
export type Prop<T, S extends keyof T> = T[S] & { };

export function get<
    T,
    S1 extends keyof T,
    S2 extends keyof Prop<T, S1>,
    S3 extends keyof Prop<Prop<T, S1>, S2>
>(
    obj: T,
    prop1: S1,
    prop2: S2,
    prop3: S3,
): Prop<Prop<T, S1>, S2>[S3] | undefined;
export function get<
    T,
    S1 extends keyof T,
    S2 extends keyof Prop<T, S1>
>(
    obj: T,
    prop1: S1,
    prop2: S2
): Prop<T, S1>[S2] | undefined;
export function get<
    T,
    S1 extends keyof T
>(
    obj: T,
    prop1: S1
): T[S1];
export function get<
    T,
    S1 extends keyof T,
    S2 extends keyof T[S1],
    S3 extends keyof T[S1][S2]
>(
    obj: T,
    prop1: S1,
    prop2?: S2,
    prop3?: S3,
):  T[S1] | T[S1][S2] | T[S1][S2][S3] | undefined {
    const props = [].slice.call(arguments, 1);
    let value: any = obj;

    while (props.length > 0) {
        if (value == null) return undefined;

        let nextProp = props.shift();
        value = value[nextProp];
    }

    return value;
}

export default get;