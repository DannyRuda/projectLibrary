let bookArray = [];

function Book(title, author, pages, read, number) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this._number = number;
}

function changeReadStatus () {
    this.read = this.read ? false : true;
}

function getFormData() {
    return new FormData(document.querySelector('form'));
}

function addBooktoHtml(book) {
    let htmlBook = document.createElement('div');
    htmlBook.classList.add('book');
    htmlBook.setAttribute('data-BookIndexNumber',book.bookIndexNumber);
    let bookTitle = document.createElement('h1');
    let bookAuthor = document.createElement('h2');
    let bookPages = document.createElement('h2');
    let bookReadStatus = document.createElement('button');
    let bookRemove = document.createElement('button');
    bookTitle.innerText = book.title;
    bookAuthor.innerText = book.author;
    bookPages.innerText = book.pages;
    bookReadStatus.innerText = book.read ? 'read' : 'not read';
    bookRemove.innerText = 'Remove';
    htmlBook.append(bookTitle,bookAuthor,bookPages,bookReadStatus,bookRemove)
    document.querySelector('.books').append(htmlBook);
}

let bookIndexNumber = 1;
function addBook(event) {
    event.preventDefault();
    console.log('enters addBook')
    let formData = getFormData();
    console.log('enters addBook')
    let book = new Book(formData.title, formData.author, formData.pages, formData.read, bookIndexNumber);
    bookIndexNumber++;
    bookArray.push(book);
    addBooktoHtml(book);
}

Book.prototype.changeReadStatus = changeReadStatus;

let buttonAddBook = document.querySelector('.addBook button');
let newBookForm = document.querySelector('.bookForm');
function buttonClicked() {
    console.log(newBookForm.classList);
    newBookForm.classList.remove('hide');
}

buttonAddBook.addEventListener('click', buttonClicked);

let submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', addBook);