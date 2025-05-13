const assert = require('assert');
const app = require('../../src/app');

describe('\'userInterests\' service', () => {
  it('registered the service', () => {
    const service = app.service('userInterests');

    assert.ok(service, 'Registered the service (userInterests)');
  });
});
