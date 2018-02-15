// The '& {}' hereeffectively eliminates undefined from the return type for us.
export type Prop<T, S extends keyof T> = T[S] & { };

export function get<
    T,
    S1 extends keyof T,
    S2 extends keyof Prop<T, S1>,
    S3 extends keyof Prop<Prop<T, S1>, S2>,
    S4 extends keyof Prop<Prop<Prop<T, S1>, S2>, S3>
>(
    obj: T,
    prop1: S1,
    prop2: S2,
    prop3: S3,
    prop4: S4,
): Prop<Prop<Prop<T, S1>, S2>, S3>[S4] | undefined;
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
export function get<T>(
    obj: T,
    ...props: string[]
): any | undefined {
    let value: any = obj;

    while (props.length > 0) {
        if (value == null) return undefined;

        let nextProp = <keyof any> props.shift();
        value = value[nextProp];
    }

    return value;
}

export default get;