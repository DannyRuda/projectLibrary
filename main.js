let bookArray = [ {title: 'Harry Potter and the Philosophers Stone',
                   author: 'J.K. Rowling',
                   pages: '336',
                   read: false,
                   _number: 0},

                  {title: 'A Tale of Two Citys',
                   author: 'Charles Dickens',
                   pages: '544',
                   read: true
                  }];

function displaySavedBooks(bookArray) {
    for (let book of bookArray) {
        addBooktoHtml(book);
    }
}

displaySavedBooks(bookArray);

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
    let formData = new FormData(document.querySelector('form'));
    let formDataArray = [];
    for (let i of formData.entries()) {
        if (i[0] !== 'read') {
            formDataArray.push(i[1]);
        }
    }
    formDataArray.push(document.querySelector('#read').checked)
    console.log(formDataArray);
    return formDataArray;
}


function addBooktoHtml(book) {
    let htmlBook = document.createElement('div');
    htmlBook.classList.add('book');
    htmlBook.setAttribute('data-Book-index-number',book.bookIndexNumber);
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
    bookRemove.classList.add('lastButton', 'remove');
    bookRemove.addEventListener('click', removeBook);
    htmlBook.append(bookTitle,bookAuthor,bookPages,bookReadStatus,bookRemove);
    document.querySelector('.books').append(htmlBook);
}

//bookIndexNumber will count like array indexes, starting from 0
let bookIndexNumber = bookArray.length;

function addBook(event) {
    event.preventDefault();
    let formDataArray = getFormData();
    let book = new Book(...formDataArray, bookIndexNumber);
    console.log(book);
    bookIndexNumber++;
    bookArray.push(book);
    addBooktoHtml(book);
    newBookForm.classList.add('hide');
    resetFormValues();
}

function resetFormValues() {
    document.querySelector('form').reset();
}

function removeBook(event) {
    let bookIdent = event.target.parentElement.dataset.bookIndexNumber;
    event.target.parentElement.remove();
    for (book of bookArray) {
        if(book.bookIndexNumber === bookIdent) {
            bookArray.splice(bookArray.indexOf(book));
        }
    }
    bookArray.splice(bookArray.indexOf('bookIdent'))
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

let removeButtonArray = [...document.getElementsByClassName('remove')];

for (let removeButton of removeButtonArray) {
    removeButton.addEventListener('click', removeBook);
}