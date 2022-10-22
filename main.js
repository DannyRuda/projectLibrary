// bookArray stores all book objects that will be created  
let bookArray = [ {title: 'Harry Potter and the Philosophers Stone',
                   author: 'J.K. Rowling',
                   pages: '336',
                   read: false,
                   _number: 0,
                   changeReadPropertyValue: changeReadPropertyValue},

                  {title: 'A Tale of Two Citys',
                   author: 'Charles Dickens',
                   pages: '544',
                   read: true,
                   _number: 1,
                   changeReadPropertyValue: changeReadPropertyValue
                  }];



// if bookArray can later be saved to an account, this function will
// display the book objects from bookArray
function displaySavedBooks(bookArray) {
    for (let book of bookArray) {
        addBooktoHtml(book);
    }
}

displaySavedBooks(bookArray);

// constructor for book objects, _number will be used for identification
function Book(title, author, pages, read, number) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this._number = number;
}

// stores the values of the form elements in an array and returns that array
// so the function can be called to use the form data when creating a new 
//book object 
function getFormData() {
    let formData = new FormData(document.querySelector('form'));
    let formDataArray = [];
    for (let i of formData.entries()) {
        if (i[0] !== 'read') {
            formDataArray.push(i[1]);
        }
    }
    formDataArray.push(document.querySelector('#read').checked)
    return formDataArray;
}

// creates html elements according to the current values of the form and adds 
// these elements to the DOM to display the book Data in a card
function addBooktoHtml(book) {
    let htmlBook = document.createElement('div');
    htmlBook.classList.add('book');
    htmlBook.setAttribute('data-Book-index-number',book._number);
    let bookTitle = document.createElement('h1');
    let bookAuthor = document.createElement('h2');
    let bookPages = document.createElement('h2');
    let bookReadStatus = document.createElement('button');
    let bookRemove = document.createElement('button');
    bookTitle.innerText = book.title;
    bookAuthor.innerText = book.author;
    bookPages.innerText = book.pages;
    bookReadStatus.innerText = book.read ? 'read' : 'not read';
    bookReadStatus.addEventListener('click',changeReadStatus);
    bookRemove.innerText = 'Remove';
    bookRemove.classList.add('lastButton', 'remove');
    bookRemove.addEventListener('click', removeBook);
    htmlBook.append(bookTitle,bookAuthor,bookPages,bookReadStatus,bookRemove);
    document.querySelector('.books').append(htmlBook);
}

//bookIndexNumber will count like array indexes, starting from 0
let bookIndexNumber = bookArray.length;

// prevents the form from reloading the page when submitting, creates new book 
// object with the getFormData function, adds it to the book array, creates and 
// modifies html elements to display book data and resets form values
function addBook(event) {
    event.preventDefault();
    let formDataArray = getFormData();
    if(formDataArray[0] && formDataArray[1] && formDataArray[2] > 0) {
        let book = new Book(...formDataArray, bookIndexNumber);
    bookIndexNumber++;
    bookArray.push(book);
    addBooktoHtml(book);
    newBookForm.classList.add('hide');
    formBackground.classList.add('hide');
    resetFormValues();
    } else if(formDataArray[2] > 0){
        alert('Please enter a book title, an author and the number of pages');
    } else {
        alert('Please enter a book title, an author and a positive number of pages');
    }
}

function resetFormValues() {
    document.querySelector('form').reset();
}

// removes book from bookArray and book card from the website and updates bookIndexNumber of html book divs as well as global bookIndexNumer 
function removeBook(event) {
    let bookIdent = event.target.parentElement.dataset.bookIndexNumber;

    event.target.parentElement.remove();
    for (let book of bookArray) {
        if(book._number == bookIdent) {
            console.log('remove book');
            bookArray.splice(bookArray.indexOf(book),1);
        }
    }
    adaptBookElementIndex(bookIdent);
}

//creates variables representing the addBook button and the form
let buttonAddBook = document.querySelector('.addBook button');
let newBookForm = document.querySelector('.bookForm');
let formBackground = document.querySelector('.formBackground');

// shows the form 
function buttonClicked() {
    newBookForm.classList.remove('hide');
    formBackground.classList.remove('hide');
}


buttonAddBook.addEventListener('click', buttonClicked);

// creates variable referencing to the submit button of the form
let submitButton = document.querySelector('.submit');
// clicking the submit button calls the addBook function
submitButton.addEventListener('click', addBook);

let removeButtonArray = [...document.getElementsByClassName('remove')];

for (let removeButton of removeButtonArray) {
    removeButton.addEventListener('click', removeBook);
}

// changes read property value from calling book oject to false or true 
function changeReadPropertyValue () {
    this.read = this.read ? false : true;
}

// adds function as a method to prototype of objects created with Book constructor
Book.prototype.changeReadPropertyValue = changeReadPropertyValue;

// changes read status in book object and in the button on the book card on the website
function changeReadStatus(event) {
    let bookIdent = event.target.parentElement.dataset.bookIndexNumber;
    event.target.innerText = bookArray[bookIdent].read ? 'not read' : 'read';
    bookArray[bookIdent].changeReadPropertyValue(); 
}

// when removing a book object from the bookArray, the position of the books after the removed
// one in the array change but the bookIndexNumber property value of the html elements corresponding
// to the book objects need to be updated as well as the global bookIndexNumber variable
// funcion reduces bookIndexNumber value of each html book div after the removed book div
function adaptBookElementIndex(index) {
    let bookList = document.querySelector('.books').childNodes;
    // bookIndex = index + 1  because first element of childNodes is a text instead of a book div which needs to be skipped
    for (let bookIndex = Number(index)+1; bookIndex < bookList.length; bookIndex++) {
        bookList[Number(bookIndex)].dataset.bookIndexNumber--;
    }
    bookIndexNumber--;
}

function closeForm() {
    newBookForm.classList.add('hide');
    formBackground.classList.add('hide');
    resetFormValues();
}

formBackground.addEventListener('click', closeForm);
newBookForm.addEventListener('mouseover',()=>{formBackground.removeEventListener('click',closeForm)});
newBookForm.addEventListener('mouseleave',()=>{formBackground.addEventListener('click', closeForm)});