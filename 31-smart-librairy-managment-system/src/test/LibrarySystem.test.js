import LibrarySystem from "../core/LibrarySystem.js";

const lib1 = LibrarySystem.getInstance();
const lib2 = LibrarySystem.getInstance();

console.assert(lib1 === lib2, "Singleton failed");
