
import { faker } from "@faker-js/faker";
export default (user,count,itineraryIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
itineraryID: itineraryIDIds[i % itineraryIDIds.length],
cityName: faker.lorem.sentence(""),
country: faker.lorem.sentence(""),
latlong: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
