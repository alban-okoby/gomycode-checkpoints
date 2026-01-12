import User from "./User.js";

export default class Teacher extends User {
  getMaxBorrowLimit() {
    return 5;
  }
}
