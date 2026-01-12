import Student from "./Student.js";
import Teacher from "./Teacher.js";
import { USER_TYPES } from "../utils/constants.js";

export default class UserFactory {
  static createUser(type, id, name) {
    switch (type) {
      case USER_TYPES.STUDENT:
        return new Student(id, name);
      case USER_TYPES.TEACHER:
        return new Teacher(id, name);
      default:
        throw new Error("Invalid user type");
    }
  }
}
