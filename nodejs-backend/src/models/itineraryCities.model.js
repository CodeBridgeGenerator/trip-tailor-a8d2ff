
    module.exports = function (app) {
        const modelName = 'itinerary_cities';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            itineraryID: { type: Schema.Types.ObjectId, ref: "itineraries" },
cityName: { type:  String , required: true, maxLength: null },
country: { type:  String , required: true, maxLength: null },
latlong: { type:  String , required: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };