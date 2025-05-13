
import { faker } from "@faker-js/faker";
export default (user,count,paymentIDIds,userIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
paymentID: paymentIDIds[i % paymentIDIds.length],
userID: userIDIds[i % userIDIds.length],
receiptURL: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
