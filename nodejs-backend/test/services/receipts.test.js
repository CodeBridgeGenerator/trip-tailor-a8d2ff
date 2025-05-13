const assert = require('assert');
const app = require('../../src/app');

describe('\'receipts\' service', () => {
  it('registered the service', () => {
    const service = app.service('receipts');

    assert.ok(service, 'Registered the service (receipts)');
  });
});
