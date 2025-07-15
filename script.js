const myLibrary = [];

// Book constructor
function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype to toggle read status
Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

// Add book to library
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  displayBooks();
}

// Remove book by ID
function removeBookById(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

// Display books on the page
function displayBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  myLibrary.forEach(book => {
    const bookCard = document.createElement("div");
    bookCard.className = "book";
    bookCard.dataset.bookId = book.id;

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> <span class="read-status">${book.read ? "Yes" : "No"}</span></p>
      <button class="remove-btn" data-id="${book.id}">Remove</button>
      <button class="toggle-read-btn" data-id="${book.id}">Toggle Read</button>
    `;

    bookList.appendChild(bookCard);
  });

  // Remove button handler
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      removeBookById(id);
    });
  });

  // Toggle read handler
  document.querySelectorAll(".toggle-read-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      const book = myLibrary.find(b => b.id === id);
      if (book) {
        book.toggleRead();
        displayBooks();
      }
    });
  });
}

// Handle modal open/close
document.getElementById("new-book-btn").addEventListener("click", () => {
  document.getElementById("book-dialog").showModal();
});

document.getElementById("cancel-btn").addEventListener("click", () => {
  document.getElementById("book-dialog").close();
});

// Handle form submission
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = parseInt(document.getElementById("pages").value);
  const read = document.getElementById("read").checked;

  if (title && author && pages > 0) {
    addBookToLibrary(title, author, pages, read);
    this.reset();
    document.getElementById("book-dialog").close();
  }
});

// Add some sample books initially
myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 310, true));
myLibrary.push(new Book("1984", "George Orwell", 328, false));
displayBooks();
