
import { faker } from "@faker-js/faker";
export default (user,count,dayPlanIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
dayPlanID: dayPlanIDIds[i % dayPlanIDIds.length],
name: faker.lorem.sentence(1),
location: faker.lorem.sentence(1),
estimatedCost: faker.lorem.sentence(1),
startTime: faker.lorem.sentence(1),
endTime: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
