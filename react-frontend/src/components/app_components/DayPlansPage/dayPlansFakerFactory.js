
import { faker } from "@faker-js/faker";
export default (user,count,ItineraryIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
ItineraryID: ItineraryIDIds[i % ItineraryIDIds.length],
date: faker.datatype.number(""),
summary: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
