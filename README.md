# typesafe-get [![Travis Build Status](https://img.shields.io/travis/pimterry/typesafe-get.svg)](https://travis-ci.org/pimterry/typesafe-get) [![Uses TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](http://typescriptlang.org)

A typesafe way to get nested properties when any parent properties might be undefined, while we wait for the [optional chaining operator](https://tc39.github.io/proposal-optional-chaining/) to finally exist.

With typesafe get, the below TypeScript code will run, without throwing any exceptions, for all valid values of `input`:

```ts
let input: { a: { b?: { c: null | { d: string } } } } | undefined = ...;
let result: string | undefined = get(input, 'a', 'b', 'c', 'd');
```

All parameters are validated as properties at the relevant level, and
the return type will always be `finalPropType | undefined` (the type of the property
at the very last level, or undefined).

If at any point while following the chain you attempt to follow a path through an
undefined object then undefined is immediately returned, and you'll never see the dreaded
`Cannot read property '<something>' of undefined` exception. It works with simple iteration
over the property names provided, no crazy (and expensive) try/catch magic here.

## Install it

```
npm install --save typesafe-get
```

## Use it

This module ships with TypeScript types, and is built in JS for UMD, so you should
be able to immediately start using it in many environments with no further setup.

With some webpack configurations, you'll need to explicitly allow requiring UMD modules.
To do that you can use [UMD-Compat-Loader](https://www.npmjs.com/package/umd-compat-loader),
like so:

```js
module: {
    rules: [
        // ...other rules here
        {
            // You can use (typesafe-get|other-module) if you're using multiple UMD modules
            test: /node_modules[\\|/]typesafe-get/,
            use: { loader: 'umd-compat-loader' }
        }
    ]
}
```

The `get` function is exported as both a property and the default export of this module.
That means importing looks like:

```ts
import { get } from 'typesafe-get';
// or
import get from 'typesafe-get';
```

To use `get`:

```ts
// Equivalent to obj.aPropertyKey
get(obj, 'aPropertyKey');

// Equivalent to obj.key1.key2, but returning undefined if obj.key1 is undefined:
get(obj, 'key1', 'key2');

// Equivalent to obj.key1.key2.key3.key4.key5, but returning undefined if any step en route is undefined:
get(obj, 'key1', 'key2', 'key3', 'key4', 'key5');
```

Each parameter name is checked against the valid parameter names at that level (so a parameter
name that definitely doesn't exist will be caught by TS).

The return type will be automatically inferred as the type the final parameter would have,
if the whole chain is defined, or `undefined`.

`get` itself supports up to 5 property parameters max. If you really truly honestly need more than that,
take a good hard look at yourself, and then feel free to open a PR - it should be fairly easy to see
how to extend the types to support more. But only if you're _really_ sure you need this. Seriously,
what are you doing that makes this a good idea.

`get` does _not_ support array indexes, only string-indexed object properties. This is a
typing limitation (the runtime implementation can actually handle this). I'd like to look at improving that
in future, but I haven't yet. Feel free to open a PR!

## Contributing

Have a bug? File an issue with a simple example that reproduces this so we can take a look & confirm.

Want to make a change? Submit a PR, explain why it's useful, and make sure you've updated the docs
(this file) and the tests (see `test.ts`). You can run the tests with `npm test`.
