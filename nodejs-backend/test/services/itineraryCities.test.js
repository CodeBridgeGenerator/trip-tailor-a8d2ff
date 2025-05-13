const assert = require('assert');
const app = require('../../src/app');

describe('\'itineraryCities\' service', () => {
  it('registered the service', () => {
    const service = app.service('itineraryCities');

    assert.ok(service, 'Registered the service (itineraryCities)');
  });
});
