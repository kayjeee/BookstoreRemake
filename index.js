const storedForm = localStorage.getItem('form');
const books = storedForm ? JSON.parse(storedForm) : [];

class Books {
constructor(author, title, books, button) {
  this.author = author;
  this.title = title;
  this.books = books;
  this.button = button;
  }

  addBook() {
    // Create a new book object with the provided title and author and directly push it to the books array
    this.books.push({ title: this.title, author: this.author });
  }
  
  deleteBook() {
    // Get the parent item and its parent element
    const item = this.button.parentNode;
    const parent = item.parentNode;
    // Remove the parent element from its parent node
    parent.parentNode.removeChild(parent);
  
    // Get the ID of the button
    const id = this.button.id;
  
    // Iterate through the books array
    for (let i = 0; i < this.books.length; i++) {
      // Check if the ID includes the current index
      if (id.includes(i)) {
        // Remove the book at the current index
        this.books.splice(i, 1);
        // Exit the loop after the deletion
        break;
      }
    }
  }
  
}

// Function to store form data in localStorage
function storeForm(form) {
  // Convert the form object to a JSON string and store it in localStorage
  localStorage.setItem('form', JSON.stringify(form));
}

function displayBooks(book, index) {
const content = '<div class="tableRow">' +
  '<div>"' + book.title + '" by ' + book.author + '</div>' +
  '<div><button id="delete' + index + '">Remove</button></div>' +
  '</div>';

  return content;
}

const addButton = document.getElementById('addBook');
const newTitle = document.getElementById('bookTitle');
const newAuthor = document.getElementById('authorName');
const container = document.querySelector('.bodyh1');
const navBar = document.querySelector('.nav-bar');

for (let i = 0; i < books.length; i += 1) {
  const book = displayBooks(books[i], i);
  container.innerHTML += book;
}

addButton.addEventListener('click', handleAddBook);

function handleAddBook(event) {
  event.preventDefault(); // Prevents the default form submission behavior

  // Extract the trimmed values of the author and title fields
  const newAuthorValue = newAuthor.value.trim();
  const newTitleValue = newTitle.value.trim();

  // Check if the author and title values are not empty
  if (newAuthorValue !== '' && newTitleValue !== '') {
    const library = new Books(newAuthorValue, newTitleValue, books); // Create a new instance of the Books class with provided values
    library.addBook(); // Add the book to the library
    storeForm(books); // Store the updated library in some form of storage
    refreshPage(); // Reload the page
  }

  resetForm(); // Reset the form
}

function refreshPage() {
  window.location.reload(); // Reload the page
}

function resetForm() {
  document.getElementById('addNewForm').reset(); // Reset the form
}


const btnDelete = document.querySelectorAll('[id^="delete"]');

// Iterate over each delete button
btnDelete.forEach((button) => {
  button.addEventListener('click', function() {
    // Create a new instance of the Books class with provided values and the clicked button
    var libraryOne = new Books(newAuthor.value, newTitle.value, books, button);
  
    libraryOne.deleteBook(); // Call the deleteBook method of the Books class
    storeForm(books); // Store the updated library in some form of storage
  });
});


// SPA

const homeNavboet = document.querySelector('.nav-home');
const booksNavBra = document.querySelector('.nav-books');
const navContact = document.querySelector('.nav-contact');

const homeSection = document.querySelector('.home');
const bookSection = document.querySelector('.books');
const contactSection = document.querySelector('.contacts');

homeNavboet.addEventListener('click', () => {
  homeNavboet.style.color = 'blue';
  booksNavBra.style.color = 'black';
  navContact.style.color = 'black';
  homeSection.style.display = 'flex';
  bookSection.style.display = 'none';
  contactSection.style.display = 'none';
});
booksNavBra.addEventListener('click', () => {
  homeNavboet.style.color = 'black';
  booksNavBra.style.color = 'blue';
  navContact.style.color = 'black';
  homeSection.style.display = 'none';
  bookSection.style.display = 'flex';
  contactSection.style.display = 'none';
});
navContact.addEventListener('click', () => {
  homeNavboet.style.color = 'black';
  booksNavBra.style.color = 'blue';
  navContact.style.color = 'black';
  homeSection.style.display = 'none';
  bookSection.style.display = 'none';
  contactSection.style.display = 'block';
});
const handleNavClick = (navItem, navItems, sections) => {
  // Reset all nav items and sections
  navItems.forEach((item) => {
    item.style.color = 'black';
  });
  sections.forEach((section) => {
    section.style.display = 'none';
  });

  // Highlight selected nav item and show corresponding section
  navItem.style.color = 'blue';
  const { sectionId } = navItem.dataset;
  const section = document.getElementById(sectionId);
  if (section) {
    section.style.display = 'flex';
  }
};

navContact.addEventListener('click', () => {
  const navItems = navBar.querySelectorAll('.nav-item');
  handleNavClick(navContact, navItems, [contactSection]); // <-- Pass contactSection as argument
});

const timeSlot = document.getElementById('time');

const today = new Date();
const date = `${today.toLocaleString('default', { month: 'long' })} ${today.getDate()} ${today.getFullYear()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;

timeSlot.innerHTML = dateTime;