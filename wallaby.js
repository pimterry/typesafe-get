module.exports = (wallaby) => {
  process.env.NODE_EXTRA_CA_CERTS = './test/fixtures/test-ca.pem'

  return {
    files: [
      'package.json',
      'index.ts',
      '!test.ts'
    ],
    tests: [
      'test.ts'
    ],

    workers: {
      initial: 4,
      regular: 1,
      restart: true
    },

    testFramework: 'mocha',
    env: {
      type: 'node'
    },
    debug: true
  };
};