const assert = require('assert');
const app = require('../../src/app');

describe('\'bookmarks\' service', () => {
  it('registered the service', () => {
    const service = app.service('bookmarks');

    assert.ok(service, 'Registered the service (bookmarks)');
  });
});
