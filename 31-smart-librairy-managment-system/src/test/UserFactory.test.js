import UserFactory from "../users/UserFactory.js";
import { USER_TYPES } from "../utils/constants.js";
import Student from "../users/Student.js";
import Teacher from "../users/Teacher.js";

describe("UserFactory", () => {
  test("should create a Student", () => {
    const user = UserFactory.createUser(USER_TYPES.STUDENT, "U1", "Alice");
    expect(user).toBeInstanceOf(Student);
    expect(user.name).toBe("Alice");
    expect(user.getMaxBorrowLimit()).toBe(3);
  });

  test("should create a Teacher", () => {
    const user = UserFactory.createUser(USER_TYPES.TEACHER, "U2", "Bob");
    expect(user).toBeInstanceOf(Teacher);
    expect(user.name).toBe("Bob");
    expect(user.getMaxBorrowLimit()).toBe(5);
  });

  test("should throw error for invalid type", () => {
    expect(() =>
      UserFactory.createUser("invalid", "U3", "Charlie")
    ).toThrow("Invalid user type");
  });
});
