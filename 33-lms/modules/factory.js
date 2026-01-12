import { Book } from './book.js';
import { Member } from './member.js';

export class EntityFactory {
    static createBook(id, title, author, ISBN) {
        return new Book(id, title, author, ISBN);
    }

    static createMember(id, name, email) {
        return new Member(id, name, email);
    }
}
