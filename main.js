let buttonAddBook = document.querySelector('.addBook button');
let newBookForm = document.querySelector('.bookForm');
function buttonClicked() {
    console.log(newBookForm.classList);
    newBookForm.classList.remove('hide');
}

buttonAddBook.addEventListener('click', buttonClicked);