export default class Book {
  constructor(id, title) {
    this.id = id;
    this.title = title;
    this.available = true;
  }

  borrow() {
    if (!this.available) {
      throw new Error("Book not available");
    }
    this.available = false;
  }

  returnBook() {
    this.available = true;
  }
}
