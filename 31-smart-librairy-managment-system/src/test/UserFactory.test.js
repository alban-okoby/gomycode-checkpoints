import UserFactory from "../src/users/UserFactory.js";
import { USER_TYPES } from "../src/utils/constants.js";

const user = UserFactory.createUser(USER_TYPES.STUDENT, "1", "Test");
console.assert(user.name === "Test", "UserFactory failed");
