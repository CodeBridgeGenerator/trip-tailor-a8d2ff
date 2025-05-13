const assert = require('assert');
const app = require('../../src/app');

describe('\'dayPlans\' service', () => {
  it('registered the service', () => {
    const service = app.service('dayPlans');

    assert.ok(service, 'Registered the service (dayPlans)');
  });
});
