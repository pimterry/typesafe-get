// Given an object T - returns a type with undefined/null removed from
// the types of any fields.
export type Defined<T> = {
    [K in keyof T]-?: Exclude<T[K], null>
};
export type Prop<T, S extends keyof T> = Defined<T>[S];

export function get<
    T,
    S1 extends keyof Defined<T>,
    S2 extends keyof Prop<Defined<T>, S1>,
    S3 extends keyof Prop<Prop<Defined<T>, S1>, S2>,
    S4 extends keyof Prop<Prop<Prop<Defined<T>, S1>, S2>, S3>,
    S5 extends keyof Prop<Prop<Prop<Prop<Defined<T>, S1>, S2>, S3>, S4>
>(
    obj: T | undefined,
    prop1: S1,
    prop2: S2,
    prop3: S3,
    prop4: S4,
    prop5: S5,
): Prop<Prop<Prop<Prop<Defined<T>, S1>, S2>, S3>, S4>[S5] | undefined;
export function get<
    T,
    S1 extends keyof Defined<T>,
    S2 extends keyof Prop<Defined<T>, S1>,
    S3 extends keyof Prop<Prop<Defined<T>, S1>, S2>,
    S4 extends keyof Prop<Prop<Prop<Defined<T>, S1>, S2>, S3>
>(
    obj: T | undefined,
    prop1: S1,
    prop2: S2,
    prop3: S3,
    prop4: S4,
): Prop<Prop<Prop<Defined<T>, S1>, S2>, S3>[S4] | undefined;
export function get<
    T,
    S1 extends keyof Defined<T>,
    S2 extends keyof Prop<Defined<T>, S1>,
    S3 extends keyof Prop<Prop<Defined<T>, S1>, S2>
>(
    obj: T | undefined,
    prop1: S1,
    prop2: S2,
    prop3: S3,
): Prop<Prop<Defined<T>, S1>, S2>[S3] | undefined;
export function get<
    T,
    S1 extends keyof Defined<T>,
    S2 extends keyof Prop<Defined<T>, S1>
>(
    obj: T | undefined,
    prop1: S1,
    prop2: S2
): Prop<Defined<T>, S1>[S2] | undefined;
export function get<
    T,
    S1 extends keyof Defined<T>
>(
    obj: T | undefined,
    prop1: S1
): Prop<Defined<T>, S1>;
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