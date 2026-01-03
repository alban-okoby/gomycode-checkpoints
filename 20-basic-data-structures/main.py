# -----------------------------
# Contact Management System
# -----------------------------

# Node class for Doubly Linked List
class Node:
    def __init__(self, contact):
        self.contact = contact
        self.prev = None
        self.next = None

# Contact class
class Contact:
    def __init__(self, name, phone):
        self.name = name
        self.phone = phone

# Doubly Linked List class
class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def add_contact(self, contact):
        new_node = Node(contact)
        if self.head is None:  # empty list
            self.head = self.tail = new_node
        else:
            self.tail.next = new_node
            new_node.prev = self.tail
            self.tail = new_node

    def display_forward(self):
        current = self.head
        if not current:
            print("No contacts found.")
            return
        while current:
            print(f"{current.contact.name} - {current.contact.phone}")
            current = current.next

    def display_backward(self):
        current = self.tail
        if not current:
            print("No contacts found.")
            return
        while current:
            print(f"{current.contact.name} - {current.contact.phone}")
            current = current.prev

    # Substring search (naive)
    def search_by_keyword(self, keyword):
        current = self.head
        found = False
        while current:
            if keyword.lower() in current.contact.name.lower():
                print(f"Match found: {current.contact.name} - {current.contact.phone}")
                found = True
            current = current.next
        if not found:
            print("No matches found.")

# -----------------------------
# Main Program
# -----------------------------
def main():
    contacts_list = DoublyLinkedList()  # Doubly Linked List
    contacts_dict = {}  # Hash Table for exact name lookup

    while True:
        print("\n1. Add Contact")
        print("2. Search by Keyword")
        print("3. Search by Exact Name")
        print("4. View All (Forward)")
        print("5. View All (Backward)")
        print("6. Exit")

        choice = input("\nEnter option: ")

        if choice == '1':
            name = input("Name: ")
            phone = input("Phone: ")
            contact = Contact(name, phone)
            contacts_list.add_contact(contact)
            contacts_dict[name.lower()] = contact  # store in hash table
            print("Contact added.")

        elif choice == '2':
            keyword = input("Search keyword: ")
            contacts_list.search_by_keyword(keyword)

        elif choice == '3':
            name = input("Enter exact name: ")
            contact = contacts_dict.get(name.lower())
            if contact:
                print(f"Contact found: {contact.name} - {contact.phone}")
            else:
                print("Contact not found.")

        elif choice == '4':
            print("\nContacts (Forward):")
            contacts_list.display_forward()

        elif choice == '5':
            print("\nContacts (Backward):")
            contacts_list.display_backward()

        elif choice == '6':
            print("Exiting...")
            break

        else:
            print("Invalid option. Try again.")

# Run the program
if __name__ == "__main__":
    main()
