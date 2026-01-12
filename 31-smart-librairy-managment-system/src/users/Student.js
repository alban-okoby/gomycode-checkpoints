import User from "./User.js";

export default class Student extends User {
  getMaxBorrowLimit() {
    return 3;
  }
}
