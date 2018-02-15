import get = require('./index');
import { expect } from 'chai';

describe("typesafe-get", () => {
    it("allows you to get a set top-level property", () => {
        let result = get({ result: 'correct' }, 'result');
        expect(result).to.equal('correct');
    });

    it("correctly infers the type of a queried property", () => {
        let result = get({ result: { value: 'neat' } }, 'result');
        expect(result.value).to.equal('neat');
    });

    it("lets you look up possibly undefined properties", () => {
        const input: { a?: string } = { };
        expect(get(input, 'a')).to.equal(undefined);
    });
});