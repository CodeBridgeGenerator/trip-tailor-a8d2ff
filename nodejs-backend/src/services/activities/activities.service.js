const { Activities } = require('./activities.class');
const createModel = require('../../models/activities.model');
const hooks = require('./activities.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/activities', new Activities(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('activities');

  // Get the schema of the collections 
  app.get("/activitiesSchema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const result = Object.keys(schema).map(key => {
      return {
        field: key,
        properties: schema[key]
      };
    });
    return response.status(200).json(result);
  });

  service.hooks(hooks);
};