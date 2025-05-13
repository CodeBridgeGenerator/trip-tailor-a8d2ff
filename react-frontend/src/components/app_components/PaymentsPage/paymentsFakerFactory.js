
import { faker } from "@faker-js/faker";
export default (user,count,userIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
userID: userIDIds[i % userIDIds.length],
amount: faker.date.past(""),
method: faker.date.past(""),
status: faker.date.past(""),
paymentDate: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
