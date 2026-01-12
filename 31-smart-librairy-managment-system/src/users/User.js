export default class User {
  constructor(id, name) {
    if (new.target === User) {
      throw new Error("User is an abstract class");
    }
    this.id = id;
    this.name = name;
  }

  getMaxBorrowLimit() {
    throw new Error("Method must be implemented");
  }

  notify(message) {
    console.log(`📢 ${this.name}: ${message}`);
  }
}
